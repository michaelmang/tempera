const defaultMatchers = require("../matchers");
const types = require("../types");

function findMatcherByProperty(property, matchers = defaultMatchers) {
  return (
    Object.entries(matchers).find(([_, matcher]) => {
      const match = property.match(matcher);
      return match && match.length;
    }) || []
  );
}

module.exports.getMatcher = (property) => {
  const [_, value] = findMatcherByProperty(property);
  return value;
};

module.exports.getType = (property) => {
  const [key] = findMatcherByProperty(property);

  if (!key) {
    return types.UNKNOWN;
  }

  return types[key];
};
