import getTailwindConfig from "@tempera/tailwind-config";
import { apply, setup, tw } from "twind";
import { style } from "twind/style";

export default function getTwind(tokens) {
  const config = getTailwindConfig(tokens);

  setup({
    theme: config.theme,
  });

  return { tw, apply, style };
}
