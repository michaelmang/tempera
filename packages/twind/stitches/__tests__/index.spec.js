import getStitches from "../src";

const tokens = {
  ComponentButtonBaseFontSize: '1rem',
  ComponentButtonBaseColor: 'red',
  ComponentButtonSmallFontSize: '0.75rem',
  ComponentButtonSecondaryDefaultBackgroundColor: 'red',
  ComponentButtonSecondaryDefaultColor: 'white',
  ComponentButtonSecondaryDefaultFontSize: '0.875rem',
  ComponentButtonSecondaryHoverFontSize: '0.75rem',
  ColorPrimary: 'red',
  ColorWhite: 'white',
  FontSizeTiny: '0.75rem',
  FontSizeSmall: '0.875rem',
  FontSizeMedium: '1rem',
  LineHeightTiny: '1rem',
  LineHeightSmall: '1.25rem',
  LineHeightMedium: '1.5rem'
};

describe("getStitches", () => {
  it("matches the saved snapshot", () => {
    const actual = getStitches(tokens);

    expect(actual).toMatchSnapshot();
  });
});
