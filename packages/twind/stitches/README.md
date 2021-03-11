# stitches

An API that generates twind/style shapes from a set of design tokens.

## Demo
[View On CodeSandbox](https://codesandbox.io/s/temperastitches-0ogls?file=/src/tokens.js)

## Installation

```bash
yarn add @tempera/stitches
```

## Usage

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

### Tokens
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
