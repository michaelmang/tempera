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

### twind

An API that generates a Twind instance from a set of design tokens.

#### Installation

```bash
yarn add @tempera/twind
```

#### Usage

```js
import getTwind from "@tempera/twind";

const { tw } = getTwind(tokens);

function Demo() {
  return (
    <div className={tw`text-primary`}>
  );
}
```

##### Tokens
The plugin expects these specs/tokens to be in the [javascript/es6 format which you can generate using Style Dictionary](https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6).

In other words, flat modules in PascalCase are expected.

Example:

```js
export const ColorPrimary = blue;
export const ColorSecondary = yellow;
```

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/twind/base)

### stitches

An API that generates twind/style shapes from a set of design tokens.

#### Demo
[View On CodeSandbox](https://codesandbox.io/s/temperastitches-0ogls?file=/src/tokens.js)

#### Installation

```bash
yarn add @tempera/stitches
```

#### Usage

```js
import getStitches from '@tempera/stitches';
import getTwind from '@tempera/twind';
import { style } from 'twind/style';

import tokens from './tokens';

const stitches = getStitches(tokens);

const { tw } = getTwind(tokens);

function Demo() {
  const button = style(stitches.button);

  return (
    <div>
      <button className={tw(button())}>Base Button</button>
      <button className={tw(button({ variant: 'secondary' }))}>
        Secondary Button
      </button>
    </div>
  );
}
```

##### Tokens
The plugin expects these specs/tokens to be in the [javascript/es6 format which you can generate using Style Dictionary](https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6).

In other words, flat modules in PascalCase are expected.

The tokens should follow the following format:

```js
// base format
export const Component[COMPONENT]Base[LONGHAND_CSS_PROPERTY];

// size format
export const Component[COMPONENT][SIZE][LONGHAND_CSS_PROPERTY];

// variant format
export const Component[COMPONENT][VARIANT][UI_STATE][LONGHAND_CSS_PROPERTY];
```

Examples:

```js
export const ComponentButtonBaseFontSize = '1rem';
export const ComponentButtonBaseColor = 'red';
export const ComponentButtonSmallFontSize = '0.75rem';
export const ComponentButtonSecondaryDefaultBackgroundColor = 'red';
export const ComponentButtonSecondaryDefaultColor = 'white';
export const ComponentButtonSecondaryDefaultFontSize = '0.875rem';
export const ComponentButtonSecondaryHoverFontSize = '0.75rem';
export const ColorPrimary = 'red';
export const ColorWhite = 'white';
export const FontSizeTiny = '0.75rem';
export const FontSizeSmall = '0.875rem';
export const FontSizeMedium = '1rem';
export const LineHeightTiny = '1rem';
export const LineHeightSmall = '1.25rem';
export const LineHeightMedium = '1.5rem';
```

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/twind/stitches)
