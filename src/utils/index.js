module.exports.validateSpecs = (specs) => {
  return Object.entries(specs).every(([_, value]) => typeof value !== "object");
};
