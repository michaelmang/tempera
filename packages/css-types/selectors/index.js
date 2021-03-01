const matchers = require("../matchers");
const types = require("../types");

module.exports.getType = (property) => {
  const [key] =
    Object.entries(matchers).find(([_, matcher]) => {
      const match = property.match(matcher);
      return match && match.length;
    }) || [];

  if (!key) {
    return types.UNKNOWN;
  }

  return types[key];
};
