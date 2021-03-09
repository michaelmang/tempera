import { blue } from "chalk";
import getTailwindConfig from "../src";

describe("getTailwindConfig", () => {
  it('matches the saved snapshot', () => {
    const tokens = {
      ColorPrimaryLighter: "yellow",
      ColorPrimaryDefault: "blue",
      ColorPrimaryDarker: "red",
    };

    expect(getTailwindConfig(tokens)).toMatchSnapshot();
  });
}); 