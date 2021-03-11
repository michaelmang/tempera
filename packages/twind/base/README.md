# twind

An API that generates a Twind instance from a set of design tokens.

## Installation

```bash
yarn add @tempera/twind
```

## Usage

```js
import getTwind from "@tempera/twind";

const { tw } = getTwind(tokens);

function Demo() {
  return (
    <div className={tw`text-primary`}>
  );
}
```

### Tokens
The plugin expects these specs/tokens to be in the [javascript/es6 format which you can generate using Style Dictionary](https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6).

In other words, flat modules in PascalCase are expected.

Example:

```js
export const ColorPrimary = blue;
export const ColorSecondary = yellow;
```

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/twind/base)