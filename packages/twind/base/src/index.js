import { apply, setup, tw } from "twind";
import { style } from "twind/style";

// replace with npm package
import getTailwindConfig from "../../../tailwind";

export default function getTwind(tokens) {
  const config = getTailwindConfig(tokens);

  setup({
    theme: config.theme,
  });

  return { tw, apply, style };
}
