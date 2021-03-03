# css-types

Utilities to categorize your CSS.

## Installation

```bash
yarn add @tempera/css-types
```

## Usage

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

