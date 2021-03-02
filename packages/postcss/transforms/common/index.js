const nearestColor = require("nearest-color");
const { getClosest, findIntersection, parseNumber } = require("../../utils");

module.exports.color = ({ colorSpecs, color }) => {
  return nearestColor.from(colorSpecs)(color.toHexString()).value;
};

function toFontSet(fontFamily) {
  return new Set([...fontFamily.split(" ")]);
}
module.exports.fontFamily = ({ fontFamilySpecs, fontFamily }) => {
  const fontFamilies = Object.values(fontFamilySpecs);

  const result = fontFamilies.map(toFontSet).find(fontsSet => {
    const result = findIntersection(fontsSet, toFontSet(fontFamily));
    return result && result.size;
  });

  if (!result) {
    const officialMonoFamily = fontFamilies.find(x => x.includes("mono"));
    if (fontFamily.toLowerCase().includes("mono") && officialMonoFamily) {
      return officialMonoFamily;
    }

    const fontFamilyEntries = Object.entries(fontFamilySpecs).map(([key, value]) => [key.toLowerCase(), value]);
    const [_, value] = fontFamilyEntries.find(([key]) => key.includes("default")) || [];
    return value || fontFamilies[0];
  }

  return Array.from(result).join(" ");
};

module.exports.number = ({ numberSpecs, value }) => {
  const range = Object.entries(numberSpecs).flatMap(([_, number]) =>
    parseNumber(number)
  );
  return `${getClosest(range, parseNumber(value))}rem`;
};