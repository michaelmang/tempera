# stylelint-tokens

A Stylelint plugin that helps avoid the adoption of unofficial design specifications.

# Installation

```bash
yarn add @tempera/stylelint-tokens
```

# Usage

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

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/stylelint)