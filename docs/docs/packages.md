---
id: packages
title: Packages
---

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
