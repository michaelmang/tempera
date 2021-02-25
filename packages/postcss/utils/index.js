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

module.exports.noop = () => {};

module.exports.parseNumber = (valueWithNumber) => {
  return valueWithNumber.replace(/[^0-9|.]/gm, '');
}