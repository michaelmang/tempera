const tinycolor = require("tinycolor2");

const transforms = require("./transforms/common");
const { extractSpecs, noop } = require("./utils");

module.exports = (options) => {
  const {
    onFinished = noop,
    onInvalid = noop,
    onValid = noop,
    specs,
  } = options;

  // find way to generalize this
  const colorSpecs = extractSpecs(specs, "Color");
  const fontSizeSpecs = extractSpecs(specs, "SizeFont");

  return {
    postcssPlugin: "postcss-scorecard",
    Once(root) {
      root.walkDecls((declaration) => {
        const { prop, value } = declaration;

        const color = tinycolor(value);
        const isValidColor = !parseInt(value) && color.isValid();
        const isOfficialColor = Object.values(colorSpecs).includes(
          color.toHexString()
        );
        if (isValidColor && !isOfficialColor) {
          const nearestColor = tinycolor(
            transforms.color({ colorSpecs, color })
          );

          onInvalid({
            type: "Color Palette",
            prop,
            value,
            nearestValue: nearestColor,
            context: declaration,
          });

          return null;
        }

        const isOfficialFontSize = Object.values(fontSizeSpecs).includes(value);
        if (
          prop.includes("font-size") &&
          fontSizeSpecs &&
          !isOfficialFontSize
        ) {
          const nearestFontSize = (declaration.value = transforms.fontSize({
            fontSizeSpecs,
            value,
          }));

          onInvalid({
            type: "Font Size",
            prop,
            value,
            nearestValue: nearestFontSize,
            context: declaration,
          });

          return null;
        }

        onValid({
          prop,
          value,
          context: declaration,
        });
      });

      onFinished();
    },
  };
};

module.exports.postcss = true;
