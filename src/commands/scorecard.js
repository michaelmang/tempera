const { Command, flags } = require("@oclif/command");
const extractCss = require("extract-css-core");
const postcss = require("postcss");
const pxToRem = require("postcss-pxtorem");
const expandShorthand = require("postcss-shorthand-expand");

const tokens = require("../stubs/tokens");
const { validateSpecs } = require("../utils");
const scorecard = require("../../packages/postcss");

let invalidScores = [];
let validScores = [];

class ScorecardCommand extends Command {
  async run() {
    const { flags } = this.parse(ScorecardCommand);
    const site = flags.site;
    try {
      new URL(site);
    } catch (error) {
      this.error(`The provide site is not a valid url: ${site}`);
    }

    if (!validateSpecs(tokens)) {
      this.error(
        `The provided specs are not valid. The specs should be formatted as key-value tokens: ${tokens}`
      );
    }

    const css = await extractCss(site);

    await postcss()
      .use(pxToRem)
      .use(expandShorthand)
      .use(
        scorecard({
          onFinished: () => {
            this.log({ invalidScores, validScores });
          },
          onInvalid: (score) => { invalidScores.push(score) },
          onValid: (score) => { validScores.push(score) },
          specs: tokens,
        })
      )
      .process(css, { from: undefined });
  }
}

ScorecardCommand.description = `analyze adoption of a design system 
...
Scorecard analyzes a web app or web page, collecting 
design system adoption metrics and insights for adoption.
`;

ScorecardCommand.flags = {
  site: flags.string({ char: "s", description: "site url to analyze" }),
};

ScorecardCommand.title = "Scorecard";

module.exports = ScorecardCommand;
