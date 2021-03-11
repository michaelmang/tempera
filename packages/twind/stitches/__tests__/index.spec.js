import getStitches from "../src";

// replace with npm package
import getTwind from "../../base";

const tokens = {
  ComponentButtonBaseFontSize: "0.875rem",
  ComponentButtonBaseColor: "red",
  ComponentButtonSmallFontSize: "1rem",
  ComponentButtonSecondaryDefaultFontSize: "1rem",
  ComponentButtonSecondaryHoverFontSize: "0.75rem",
  ColorPrimary: "red",
  ComponentInputBaseFontSize: "0.875rem",
  ComponentInputBaseColor: "red",
  ComponentInputSmallFontSize: "1rem",
  ComponentInputSecondaryDefaultFontSize: "1rem",
  ComponentInputSecondaryHoverFontSize: "0.75rem",
  FontSizeTiny: "0.75rem",
  FontSizeSmall: "0.875rem",
  FontSizeMedium: "1rem",
  LineHeightTiny: "1rem",
  LineHeightSmall: "1.25rem",
  LineHeightMedium: "1.5rem",
};

describe("getStitches", () => {
  it("matches the saved snapshot", () => {
    const { tw } = getTwind(tokens);
    const stitches = getStitches(tokens);

    let actual = Object.fromEntries(Object.entries(stitches).map(([key, value]) => {
      return [key, tw(value())]
    }));

    expect(actual).toMatchSnapshot();
  });
});
