import kebabCase from "lodash.kebabcase";
import merge from "lodash.merge";

import * as matchers from "./matchers";
import defaultConfig from "../stubs/default-tailwind-config";

export default function getConfig(tokens) {
  let result = {};

  Object.entries(tokens).forEach(([tokenKey, tokenValue]) => {
    const [matcherKey, matcherValue] = Object.entries(matchers).find(([_, matcher]) => {
      const match = kebabCase(tokenKey).match(matcher);
      return match && match.length;
    });

    if (!matcher) {
      return null;
    }

    const configKey = kebabCase(matcherKey);
    const className = kebabCase(tokenKey).replace(matcherValue, "");

    result = {
      ...result,
      [configKey]: {
        ...result[configKey],
        [className]: tokenValue,
      },
    };
  });

  return merge(defaultConfig, result);
}