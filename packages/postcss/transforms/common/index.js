const nearestColor = require("nearest-color");
const { getClosest, parseNumber } = require("../../utils");

module.exports.color = ({ colorSpecs, color }) => {
  return nearestColor.from(colorSpecs)(color.toHexString()).value;
};

module.exports.fontSize = ({ fontSizeSpecs, value }) => {
  const fontSizes = Object.entries(fontSizeSpecs).flatMap(([_, fontSize]) =>
    parseNumber(fontSize)
  );
  return `${getClosest(fontSizes, parseNumber(value))}rem`;
};
