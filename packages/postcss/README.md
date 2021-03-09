# postcss-scorecard

A PostCSS plugin that exposes hooks into design token adoption validation.

## Installation

```bash
yarn add @tempera/postcss-scorecard
```

## Usage

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

### Specs

The plugin expects these specs/tokens to be in the [javascript/es6 format which you can generate using Style Dictionary](https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6) except exported as CommonJS modules.

In other words, flat CommonJS modules in PascalCase are expected.

Example:

```js
module.exports.ColorBackgroundBase = "#ffffff";
module.exports.ColorBackgroundAlt = "#fcfcfcfc";
```

Support for tokens in ES6 format is on the roadmap.

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/postcss)
