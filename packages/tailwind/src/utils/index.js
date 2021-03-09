export function validateTokens(tokens) {
  return !!tokens && typeof tokens === "object" && Object.entries(tokens).every(([_, value]) => typeof value !== "object");
}
