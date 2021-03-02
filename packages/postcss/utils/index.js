const kebabCase = require("lodash.kebabcase");

const isMatchingKey = (matcher) => ([key]) => {
  const match = kebabCase(key).match(matcher);
  return match && match.length;
};
module.exports.extractSpecs = (specs, matcher) => {
  return Object.fromEntries(
    Object.entries(specs).filter(isMatchingKey(matcher))
  );
};

module.exports.getClosest = (list, goal) => {
  return list.reduce((l, r) => {
    return Math.abs(r - goal) < Math.abs(l - goal) ? r : l;
  }, 0);
};

module.exports.findIntersection = (setA, setB) => {
  let intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      intersection.add(elem);
    }
  }
  return intersection;
};

module.exports.noop = () => {};

module.exports.parseNumber = (valueWithNumber, { unitPrecision = 3 } = {}) => {
  return parseFloat(valueWithNumber).toFixed(unitPrecision);
};

module.exports.parseUnit = (valueWithNumber) => {
  return valueWithNumber.replace(/[0-9|.]/gm, "");
};

module.exports.toRem = (
  valueWithNumber,
  { root = 16, unitPrecision = 3 } = {}
) => {
  const unit = this.parseUnit(valueWithNumber);

  if (unit !== "px") {
    return valueWithNumber;
  }

  const number = this.parseNumber(valueWithNumber);
  return `${(number / root).toFixed(unitPrecision)}rem`;
};
