import kebabCase from "lodash.kebabcase";
import merge from "lodash.merge";

import * as matchers from "./matchers";
import { validateTokens } from "./utils";
import defaultConfig from "../stubs/default-tailwind-config";

export default function getConfig(tokens) {
  if (!validateTokens(tokens)) {
    throw new Error("Tokens are not in a valid format. A flat set of key-value modules is expected.");
  }

  let result = {};

  Object.entries(tokens).forEach(([tokenKey, tokenValue]) => {
    const [matcherKey, matcherValue] = Object.entries(matchers).find(([_, matcher]) => {
      const match = kebabCase(tokenKey).match(matcher);
      return match && match.length;
    });

    if (!matcherKey) {
      return null;
    }
    
    const matchBeginningHyphen = /^-(?=\w)/gm;
    const matchEndingHyphen = /-(?!\w)/gm;
    const configKey = kebabCase(matcherKey);
    const className = kebabCase(tokenKey).replace(matcherValue, "").replace(matchEndingHyphen, "").replace(matchBeginningHyphen, "");

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