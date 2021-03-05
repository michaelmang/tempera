---
id: usage
title: Usage
sidebar_label: Usage
slug: /
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<!-- usage -->

## Install

```sh-session
$ npm install -g tempera
$ yarn add global tempera
```

## Run Commands

**Note:** This package is experimental. You may have better success by running the command locally:

```sh-session
USAGE
  $ git clone https://github.com/michaelmang/tempera.git
  $ yarn install
  $ ./bin/run [COMMAND]
```

### Scorecard

Gather metrics around the adoption of a design system.

```sh-session
USAGE
  $ tempera scorecard -s https://www.figma.com/developers -t ./tokens.js

OPTIONS
  -s, --site=site  site url to analyze
  -t, --tokens=tokens  relative path to tokens file
  -j, --json=json  (optional) flag to enable printing output as a JSON blob; requires -o, --output to be set
  -o, --output=output  (optional) relative path for a JSON file to output; requires -j, --json to be enabled

DESCRIPTION
  ...
  Scorecard analyzes a web app or web page,
  collecting design system adoption metrics
  and insights for adoption.
```

#### Tokens

Design tokens are key-value pairs that represent a specification (aka "spec") of a design system.

If you are new to design tokens, [here's a good place to start](https://www.michaelmang.dev/blog/introduction-to-design-tokens).

Tempera's `scorecard` command expects these tokens to be in the [javascript/es6 format which you can generate using Style Dictionary](https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6) except exported as CommonJS modules.

In other words, flat CommonJS modules in PascalCase are expected.

Support for tokens in ES6 format is on the roadmap.

Example:

```js
module.exports.ColorBackgroundBase = "#ffffff";
module.exports.ColorBackgroundAlt = "#fcfcfcfc";
```

The `scorecard` command expects the tokens to match against one of the following matchers after being transformed to kebab case:

```js
module.exports.BORDER_RADIUS = /border-radius/g;
module.exports.BREAKPOINT = /max-width/g;
module.exports.COLOR = /color/g;
module.exports.DELAY = /delay/g;
module.exports.DURATION = /duration/g;
module.exports.FONT_FAMILY = /font-family/g;
module.exports.FONT_SIZE = /font-size/g;
module.exports.FONT_WEIGHT = /font-weight/g;
module.exports.LINE_HEIGHT = /line-height/g;
module.exports.SPACING = /margin|padding/g;
module.exports.TIMING = /timing/g;
```

[You can learn more about the underlying `css-types` package that utilizes these matchers.](/docs/packages#css-types)

#### Output

<img alt="Screnshot" src={useBaseUrl('img/design-scorecard.png')} />

#### JSON Report

Useful for creating custom reporters and tooling.

```sh-session
USAGE
  $ tempera scorecard -s https://www.figma.com/developers -t ./tokens.js -j -o report.json
```

##### Output

```javascript
{
  "unofficial": [
    {
      "type": "border-radius",
      "attribute": "border-radius",
      "unofficialValue": "0.500rem",
      "nearestOfficialValue": "0.375rem"
    },
    // ...
  ],
  "summary": [
    { "category": "Font Family", "correct": 0, "incorrect": 79, "percentage": "0.00" },
    { "category": "Color", "correct": 159, "incorrect": 195, "percentage": "44.92" },
    { "category": "Font Size", "correct": 73, "incorrect": 104, "percentage": "41.24" },
    { "category": "Spacing", "correct": 264, "incorrect": 322, "percentage": "45.05" },
    { "category": "Max Width", "correct": 1, "incorrect": 25, "percentage": "3.85" },
    { "category": "Line Height", "correct": 112, "incorrect": 14, "percentage": "88.89" },
    { "category": "Border Radius", "correct": 16, "incorrect": 13, "percentage": "55.17" },
    { "category": "Font Weight", "correct": 78, "incorrect": 2, "percentage": "97.50" }
  ],
  "total": { "correct": 703, "incorrect": 754, "percentage": "48.25", "grade": "F" }
}
```

### Help

```sh-session
$ tempera --help [COMMAND]
USAGE
  $ tempera COMMAND
```

<!-- usagestop -->
