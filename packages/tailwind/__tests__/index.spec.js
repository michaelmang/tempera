import getTailwindConfig from "../src";

describe("getTailwindConfig", () => {
  it("matches the saved snapshot", () => {
    const tokens = {
      ColorPrimaryLighter: "yellow",
      ColorPrimaryDefault: "blue",
      ColorPrimaryDarker: "red",
      FontFamilyMono: "Roboto Mono, monospace",
      FontSizeTiny: "0.75rem",
      FontSizeSmall: "0.875rem",
      FontSizeMedium: "1rem",
      LineHeightTiny: "1rem",
      LineHeightSmall: "1.25rem",
      LineHeightMedium: "1.5rem",
    };

    expect(getTailwindConfig(tokens)).toMatchSnapshot();
  });

  describe("invalid tokens", () => {
    it("matches the saved snapshot", () => {
      const tokens = {
        color: {
          ColorPrimaryLighter: "yellow",
          ColorPrimaryDefault: "blue",
          ColorPrimaryDarker: "red",
        },
      };

      let exception;

      try {
        getTailwindConfig(tokens);
      } catch (error) {
        exception = error;
      }

      expect(exception).toMatchSnapshot();
    });
  });
  
  describe("missing line height tokens tokens", () => {
    it("matches the saved snapshot", () => {
      const tokens = {
        FontSizeTiny: "0.75rem",
        FontSizeSmall: "0.875rem",
        FontSizeMedium: "1rem"
      };

      let exception;

      try {
        getTailwindConfig(tokens);
      } catch (error) {
        exception = error;
      }

      expect(exception).toMatchSnapshot();
    });
  });
});
