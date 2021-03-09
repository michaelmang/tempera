import getTailwindConfig from "../src";

describe("getTailwindConfig", () => {
  it("matches the saved snapshot", () => {
    const tokens = {
      ColorPrimaryLighter: "yellow",
      ColorPrimaryDefault: "blue",
      ColorPrimaryDarker: "red",
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
});
