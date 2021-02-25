const isMatchingKey = (matcher) => ([key]) => {
  return key.toLowerCase().startsWith(matcher.toLowerCase());
};
module.exports.extractSpecs = (specs, matcher) => {
  return Object.fromEntries(
    Object.entries(specs).filter(isMatchingKey(matcher))
  );
};

module.exports.getClosest = (list, goal) => {
  return list.reduce((l, r) => {
    return Math.abs(r - goal) < Math.abs(l - goal) ? r : l;
  });
}

const tinycolor = require("tinycolor2");
const { types } = require("../stubs");
module.exports.extractType = (declaration) => {
  const { prop, value } = declaration;

  const color = tinycolor(value);
  const isValidColor = !parseInt(value) && color.isValid();
  if (isValidColor) {
    return types.COLOR_PALETTE;
  }
  
  if (prop === types.FONT_SIZE) {
    return types.FONT_SIZE;
  }

  return types.UNKNOWN;
};

module.exports.noop = () => {};

module.exports.parseNumber = (valueWithNumber) => {
  return valueWithNumber.replace(/[^0-9|.]/gm, '');
}