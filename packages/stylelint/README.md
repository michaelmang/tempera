# stylelint-tokens

A Stylelint plugin that helps avoid the adoption of unofficial design specifications.

## Installation

```bash
yarn add @tempera/stylelint-tokens
```

## Usage

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

### Tokens
The plugin expects these tokens to be in the [javascript/es6 format which you can generate using Style Dictionary](https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6) except exported as CommonJS modules.

In other words, flat CommonJS modules in PascalCase are expected.

Example:

```js
module.exports.ColorBackgroundBase = "#ffffff";
module.exports.ColorBackgroundAlt = "#fcfcfcfc";
```

Support for tokens in ES6 format is on the roadmap.

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/stylelint))