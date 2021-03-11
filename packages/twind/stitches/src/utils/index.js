import camelCase from "lodash.camelcase";

import * as types from "../types";
import * as nameClasses from "../../stubs/plugin-class-name-mapping";

export function getClassName(property, value, theme) {
  const plugin = camelCase(property);

  const [_, tokens] = Object.entries(theme).find(([category]) => {
    if (plugin.includes("color")) {
      return category === "colors";
    }

    return category === plugin;
  }) || [];

  if (!tokens) {
    return null;
  }

  const [__, nameClass] = Object.entries(nameClasses).find(([tailwindPlugin]) => {
    return camelCase(tailwindPlugin) === plugin;
  }) || [];

  if (!nameClass) {
    return null;
  }

  const [key] = Object.entries(tokens).find(([_, tailwindValue]) => {
    if (Array.isArray(tailwindValue) && tailwindValue.every(x => typeof x === "string") ) {
      return value === tailwindValue.join(",");
    }

    if (Array.isArray(tailwindValue) && tailwindValue.some(x => typeof x === "object") ) {
      if (camelCase(property) === "fontSize") {
        return value === tailwindValue[0];
      }

      if (camelCase(property) === "lineHeight") {
        return value === tailwindValue[1].lineHeight;
      }
    }

    if (typeof tailwindValue === "object") {
      return Object.values(tailwindValue).some(x => x === value);
    }

    return value === tailwindValue;
  }) || []; 

  if (!key) {
    return null;
  }
 
  return `${nameClass}-${key}`;
}

export function getType(variant, sizes) {
  if (variant === types.BASE) {
    return types.BASE;
  }

  if (sizes.includes(variant)) {
    return types.SIZE;
  }

  return types.VARIANT;
}
