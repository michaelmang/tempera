---
id: packages
title: Packages
---

## Tools

In addition to a CLI, Tempera offers other tools to improve design tokens adoption.

### stylelint-tokens

A Stylelint plugin that helps avoid the adoption of unofficial design specifications.

#### Installation

```bash
yarn add @tempera/stylelint-tokens
```

#### Usage

Install [Stylelint](https://stylelint.io/user-guide/get-started) and update your configuration file to utilize the plugin.

```js
// stylelint.config.js
const tokens = require("./fixtures/example-tokens");

module.exports = {
  // ...
  plugins: ["@tempera/stylelint-tokens"],
  rules: {
    "@tempera/official-specs": tokens,
  },
};
```

##### Tokens
The plugin expects these tokens to be in the [javascript/es6 format which you can generate using Style Dictionary](https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6) except exported as CommonJS modules.

In other words, flat CommonJS modules in PascalCase are expected.

Example:

```js
module.exports.ColorBackgroundBase = "#ffffff";
module.exports.ColorBackgroundAlt = "#fcfcfcfc";
```

Support for tokens in ES6 format is on the roadmap.

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/stylelint)

## Supporting Packages

The underlying packages that support Tempera are publicly accessible.

You are welcome and encouraged to use these packages directly should you need a custom solution.

🚀 [Contributing](/docs/contributing) to these packages is also welcome.

### css-types

Utilities to categorize your CSS.

#### Installation

```bash
yarn add @tempera/css-types
```

#### Usage

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

### postcss-scorecard

A PostCSS plugin that exposes hooks into design token adoption validation.

#### Installation

```bash
yarn add @tempera/postcss-scorecard
```

#### Usage

```js
const pxToRem = require("postcss-pxtorem");
const expandShorthand = require("postcss-shorthand-expand");

await postcss()
  .use(pxToRem())
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

##### Specs
The plugin expects these specs/tokens to be in the [javascript/es6 format which you can generate using Style Dictionary](https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6) except exported as CommonJS modules.

In other words, flat CommonJS modules in PascalCase are expected.

Example:

```js
module.exports.ColorBackgroundBase = "#ffffff";
module.exports.ColorBackgroundAlt = "#fcfcfcfc";
```

Support for tokens in ES6 format is on the roadmap.

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/postcss)

### tailwind-config

An API that generates a Tailwind configuration from a set of design tokens.

#### Installation

```bash
yarn add @tempera/tailwind-config
```

#### Usage

```js
import getTailwindConfig from "@tempera/tailwind-config";

const tailwindConfig = getTailwindConfig(tokens);

// do something with the tailwind config
```

##### Tokens
The plugin expects these specs/tokens to be in the [javascript/es6 format which you can generate using Style Dictionary](https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6).

In other words, flat modules in PascalCase are expected.

Example:

```js
export const ColorPrimary = blue;
export const ColorSecondary = yellow;
```

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/tailwind)
