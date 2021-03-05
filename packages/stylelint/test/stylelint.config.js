const tokens = require("./fixtures/example-tokens");

module.exports = {
  extends: "stylelint-config-standard",
  plugins: ["../build/index.js"],
  rules: {
    "@tempera/official-specs": tokens,
  },
};
