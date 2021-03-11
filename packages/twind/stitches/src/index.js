import kebabCase from "lodash.kebabcase";
import merge from "lodash.merge";

import * as types from "./types";
import { getType, getClassName } from "./utils";

// replace with npm package
import getTwind from "../../base";
import getTailwindConfig from "../../../tailwind";

const defaultTokens = {
  ComponentButtonBaseFontSize: "0.875rem",
  ComponentButtonBaseColor: "red",
  ComponentButtonSmallFontSize: "1rem",
  ComponentButtonSmallFontSize: "0.75rem",
  ComponentButtonSecondaryDefaultFontSize: "1rem",
  ComponentButtonSecondaryHoverFontSize: "0.75rem",
  ColorPrimary: "red",
  ComponentInputBaseFontSize: "0.875rem",
  ComponentInputBaseColor: "red",
  ComponentInputSmallFontSize: "1rem",
  ComponentInputSmallFontSize: "0.75rem",
  ComponentInputSecondaryDefaultFontSize: "1rem",
  ComponentInputSecondaryHoverFontSize: "0.75rem",
  FontSizeTiny: "0.75rem",
  FontSizeSmall: "0.875rem",
  FontSizeMedium: "1rem",
  LineHeightTiny: "1rem",
  LineHeightSmall: "1.25rem",
  LineHeightMedium: "1.5rem",
};

export function getStitches(tokens = defaultTokens) {
  const { style: twStyle, tw } = getTwind(tokens);

  const tailwindConfig = getTailwindConfig(tokens);
  const sizes = Object.keys(tailwindConfig.theme.fontSize);

  let result = {};

  Object.entries(tokens).forEach(([tokenKey, tokenValue]) => {
    const key = kebabCase(tokenKey);
    if (!key.includes("component")) {
      return null;
    }

    const keyList = key.split("-");

    const componentIndex = 1;
    const component = keyList[componentIndex];

    const variantIndex = componentIndex + 1;
    const variant = keyList[variantIndex];

    const type = getType(variant, sizes);

    if (!type) {
      return null;
    }

    let style = {};

    if (type === types.SIZE) {
      const property = keyList.slice(variantIndex + 1).join("-");
      const className = getClassName(property, tokenValue, tailwindConfig.theme);

      if (!className) {
        return null;
      }

      const existingValue = result[component]?.variants?.[type]?.[variant] || "";

      style = merge(style, {
        variants: {
          [type]: {
            [variant]: existingValue
              .concat(
                " " + className
              )
              .trimStart(),
          },
        },
      });
    }
    else if (type === types.VARIANT) {
      const stateIndex = variantIndex + 1;
      const state = keyList[stateIndex];

      const property = keyList.slice(stateIndex + 1).join("-");
      const className = getClassName(property, tokenValue, tailwindConfig.theme);
      
      if (!className) {
        return null;
      }

      const existingValue = result[component]?.variants?.[type]?.[variant] || "";
      const newValue = state === "default" ? className : `${state}:${className}`;

      style = merge(style, {
        variants: {
          [type]: {
            [variant]: existingValue
              .concat(
                " " + newValue
              )
              .trimStart(),
          },
        },
      });
    }
    else {
      const property = keyList.slice(variantIndex + 1).join("-");
      const className = getClassName(property, tokenValue, tailwindConfig.theme);
      
      if (!className) {
        return null;
      }

      const existingValue = result[component]?.[types.BASE] || "";

      style = {
        [type]: existingValue
          .concat(
            " " + className
          )
          .trimStart(),
      };
    }

    result = {
      ...result,
      [component]: twStyle(merge(result[component], style)),
    };
  });

  return result;
}

console.log(getStitches());
