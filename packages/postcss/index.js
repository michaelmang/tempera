const { getMatcher, getType, types } = require("@tempera/css-types");
const tinycolor = require("tinycolor2");

const transforms = require("./transforms/common");
const {
  extractSpecs,
  noop,
  parseUnit,
  toRem,
  parseNumber,
} = require("./utils");

module.exports = (options) => {
  const {
    onFinished = noop,
    onInvalid = noop,
    onValid = noop,
    specs,
  } = options;

  return {
    postcssPlugin: "postcss-scorecard",
    Once(root) {
      root.walkDecls((declaration) => {
        const { prop, value } = declaration;

        const type = getType(prop);

        if (type === types.UNKNOWN) {
          return null;
        }

        const matcher = getMatcher(prop);
        const typeSpecs = extractSpecs(specs, matcher);

        const color = tinycolor(value);
        const isOfficialColor = Object.values(typeSpecs).includes(
          color.toHexString()
        );
        if (type === types.COLOR && !isOfficialColor) {
          const colorSpecs = Object.fromEntries(
            Object.entries(typeSpecs).map(([key, value]) => [
              key,
              tinycolor(value).toHexString(),
            ])
          );
          const nearestColor = tinycolor(
            transforms.color({ colorSpecs, color })
          ).toHexString();

          onInvalid({
            type,
            prop,
            value: color.toHexString(),
            nearestValue: nearestColor,
            context: declaration,
          });

          return null;
        }

        const isOfficialTiming = Object.values(typeSpecs).includes(value);
        if (type === types.TIMING && !isOfficialTiming) {
          onInvalid({
            type,
            prop,
            value,
            nearestValue: "",
            context: declaration,
          });

          return null;
        }

        const isOfficialFontFamily = Object.values(typeSpecs).includes(value);
        if (type === types.FONT_FAMILY && !isOfficialFontFamily) {
          const nearestFontFamily = transforms.fontFamily({
            fontFamilySpecs: typeSpecs,
            fontFamily: value,
          });

          onInvalid({
            type,
            prop,
            value,
            nearestValue: nearestFontFamily,
            context: declaration,
          });

          return null;
        }

        const isLonghand = value.split(" ").length === 1;
        if (isLonghand && parseFloat(value)) {
          const numberSpecs = Object.fromEntries(
            Object.entries(typeSpecs).map(([specKey, specValue]) => {
              return [specKey, toRem(specValue)];
            })
          );

          const remValue = toRem(value);

          if (
            !Object.values(numberSpecs).some(
              (x) => parseNumber(x) === parseNumber(remValue)
            )
          ) {
            const nearestValue = transforms.number({
              numberSpecs,
              value: remValue,
            });

            const unit = parseUnit(remValue);

            onInvalid({
              type,
              prop,
              value: remValue,
              nearestValue: unit !== "rem" ? "" : nearestValue,
              context: declaration,
            });

            return null;
          }
        }

        onValid({
          type,
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
