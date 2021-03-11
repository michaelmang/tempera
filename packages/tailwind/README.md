# tailwind-config

An API that generates a Tailwind configuration from a set of design tokens.

## Installation

```bash
yarn add @tempera/tailwind-config
```

## Usage

```js
import getTailwindConfig from "@tempera/tailwind-config";

const tailwindConfig = getTailwindConfig(tokens);

// do something with the tailwind config
```

### Tokens
The plugin expects these specs/tokens to be in the [javascript/es6 format which you can generate using Style Dictionary](https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6).

In other words, flat modules in PascalCase are expected.

Example:

```js
export const ColorPrimary = blue;
export const ColorSecondary = yellow;
```

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/tailwind)