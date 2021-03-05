const prefix = "@tempera";
export function namespace(ruleName) {
  return `${prefix}/${ruleName}`;
}

export function validateSpecs(specs) {
  return Object.entries(specs).every(([_, value]) => typeof value !== "object");
}
