import camelCase from "lodash.camelcase";
import kebabCase from "lodash.kebabcase";
import merge from "lodash.merge";

import * as matchers from "./matchers";
import { validateTokens } from "./utils";
import defaultConfig from "../stubs/default-tailwind-config";

export default function getConfig(tokens) {
  if (!validateTokens(tokens)) {
    throw new Error(
      "Tokens are not in a valid format. A flat set of key-value modules is expected."
    );
  }

  let result = {};

  Object.entries(tokens).forEach(([tokenKey, tokenValue]) => {
    if (kebabCase(tokenKey).includes("component")) {
      return null;
    }

    if (kebabCase(tokenKey).includes("line-height")) {
      return null;
    }

    const [matcherKey, matcherValue] = Object.entries(matchers).find(
      ([_, matcher]) => {
        const match = kebabCase(tokenKey).match(matcher);
        return match && match.length;
      }
    );

    if (!matcherKey) {
      return null;
    }

    const configKey = camelCase(matcherKey);
    const matchBeginningHyphen = /^-(?=\w)/gm;
    const matchEndingHyphen = /-(?!\w)/gm;
    const className = kebabCase(tokenKey)
      .replace(matcherValue, "")
      .replace(matchEndingHyphen, "")
      .replace(matchBeginningHyphen, "");

    let setting;

    if (configKey === "fontSize") {
      const fontSizeIndex = Object.entries(tokens)
        .filter(([key]) => camelCase(key).includes("fontSize"))
        .findIndex(([_, value]) => {
          return value === tokenValue;
        });
      
      try {
        const lineHeight = Object.entries(tokens).filter(
          ([key]) => camelCase(key).includes("lineHeight")
        )[fontSizeIndex][1];
        setting = [tokenValue, { lineHeight }];
      }
      catch (exception) {
        throw new Error("Could not find matching line height for font size. Did you include your line height tokens?");
      }
    } else if (configKey === "fontFamily") {
      setting = tokenValue.split(",").map(x => x.trimStart());
    } else {
      setting = tokenValue;
    }

    result = {
      ...result,
      [configKey]: {
        ...result[configKey],
        [className]: setting,
      },
    };
  });

  return merge(defaultConfig, { theme: result });
}
