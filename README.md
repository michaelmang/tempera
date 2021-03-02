# Tempera

A CLI toolkit for aiding design tokens adoption.

![](https://dam-13749.kxcdn.com/wp-content/uploads/2017/01/simonetta-vespucci.jpg)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/tempera.svg)](https://npmjs.org/package/tempera)
[![Downloads/week](https://img.shields.io/npm/dw/tempera.svg)](https://npmjs.org/package/tempera)
[![License](https://img.shields.io/npm/l/tempera.svg)](https://github.com/michaelmang/tempera/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Contributing](#contributing)
- [Packages](#packages)
<!-- tocstop -->

# Usage

<!-- usage -->

## Install

```sh-session
$ npm install -g tempera
$ yarn add global tempera
```

## Run Commands

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

# Contributing

---
id: contributing
title: Contributing
---
🤠  Howdy, developer! Thanks for being willing to contribute!

## Project setup

1.  Fork and clone the repo
2.  Run `yarn install` to install dependencies
3.  Create a branch for your PR with `git checkout -b pr/your-branch-name`

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/michaelmang/tempera.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```

## Committing and Pushing changes

There are currently no tests but please document manual testing on PRs with your changes. 

## Help needed

Please checkout the [the open issues][issues].

Also, please watch the repo and respond to questions/bug reports/feature
requests! Thanks!

[issues]: https://github.com/michaelmang/tempera/issues

# Packages

The underlying packages that support Tempera are publicly accessible.

You are welcome and encouraged to use these packages directly should you need a custom solution.

🚀 [Contributing](/docs/contributing) to these packages is also welcome.

## css-types

Utilities to categorize your CSS.

### Installation

```bash
yarn add @tempera/css-types
```

### Usage

```js
const {
  // Example: matchers.SPACING
  // Contains a list of regex matchers to help match common types in CSS
  matchers,
  // example: getMatcher(postcssProperty)
  // Returns a regex matcher fitting for the provided property
  getMatcher,
  // Example: types.SPACING
  // Contains a list of common types in CSS
  types,
  // Example: getType(postcssProperty)
  // Returns a common type fitting for the provided property
  getType, 
} = require("@tempera/css-types");
```

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/css-types)

## postcss-scorecard

A PostCSS plugin that exposes hooks into design token adoption validation.

### Installation

```bash
yarn add @tempera/postcss-scorecard
```

### Usage

```js
const pxToRem = require("postcss-pxtorem");
const expandShorthand = require("postcss-shorthand-expand");

await postcss()
  .use(
    pxToRem()
  )
  .use(expandShorthand)
  .use(
    scorecard({
      onInvalid: (score) => {
        // do something when CSS property is not an official spec
      },
      onValid: (score) => {
        // do something when CSS property is an official spec
      },
      onFinished: () => {
        // do something after validation finishes
      },
      specs, // the official design tokens
    })
  )
  .process(css, { from: undefined });
```

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/postcss)