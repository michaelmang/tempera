const { Command, flags } = require("@oclif/command");
const chalk = require("chalk");
const CFonts = require("cfonts");
const Pie = require("cli-pie");
const Table = require("cli-table3");
const extractCss = require("extract-css-core");
const fs = require("fs");
const groupBy = require("lodash.groupBy");
const startCase = require("lodash.startcase");
const sortBy = require("lodash.sortby");
const ora = require("ora");
const path = require("path");
const postcss = require("postcss");
const pxToRem = require("postcss-pxtorem");
const expandShorthand = require("postcss-shorthand-expand");
const tinycolor = require("tinycolor2");

const { validateSpecs } = require("../utils");
const scorecard = require("../../packages/postcss");
const { types } = require("../../packages/css-types");

let invalidScores = [];
let validScores = [];

function getPrintableValue(value) {
  const color = tinycolor(value);
  if (color.isValid()) {
    return chalk.hex(color.toHexString())(color.toHexString());
  }

  return chalk.whiteBright(value);
}

function generateUnofficialTable({ json, output }) {
  const result = new Table({
    head: [
      "Type",
      "Attribute",
      "Unofficial Value",
      "Nearest Official Value",
    ].map((x) => chalk.blueBright(x)),
    colWidths: [25, 25, 25, 25],
  });

  let data = {
    unofficial: [],
  };

  sortBy(
    invalidScores.filter(({ type }) => type !== types.UNKNOWN),
    ["type", "prop"]
  ).forEach((score) => {
    if (json) {
      data.unofficial.push({
        type: score.type,
        attribute: score.prop,
        unofficialValue: score.value,
        nearestOfficialValue: score.nearestValue,
      });
    }

    result.push([
      chalk.whiteBright(startCase(score.type.toLowerCase())),
      chalk.whiteBright(score.prop),
      getPrintableValue(score.value),
      getPrintableValue(score.nearestValue),
    ]);
  });

  return json ? data : result;
}

function groupScoresByType(scores) {
  return Object.entries(groupBy(scores, (score) => score.type));
}

function getCorrectAmount(groupedValidScores, invalidType) {
  const matchingValidGroup = groupedValidScores.find(([validType]) => {
    return validType === invalidType;
  });

  const hasSomeCorrectScores = matchingValidGroup && matchingValidGroup.length;
  if (!hasSomeCorrectScores) {
    return 0;
  }

  const [_, scores] = matchingValidGroup;
  return scores.length;
}

function getPercentage(correctAmount, incorrectAmount) {
  return ((correctAmount / (correctAmount + incorrectAmount)) * 100).toFixed(2);
}

function generateSummaryTable({ json, output }) {
  const result = new Table({
    head: ["Category", "Correct", "Incorrect", "Percentage"].map((x) =>
      chalk.blueBright(x)
    ),
    colWidths: [15, 15, 15, 55],
  });

  const groupedInvalidScores = groupScoresByType(invalidScores);
  const groupedValidScores = groupScoresByType(validScores);

  const pieRadius = 5;
  let totalCorrect = 0;
  let totalIncorrect = 0;

  let data = {
    summary: [],
  };

  groupedInvalidScores.forEach(([type, scores]) => {
    const incorrectAmount = scores.length;
    const correctAmount = getCorrectAmount(groupedValidScores, type);

    if (json) {
      data.summary.push({
        category: startCase(type.toLowerCase()),
        correct: correctAmount,
        incorrect: incorrectAmount,
        percentage: getPercentage(correctAmount, incorrectAmount),
      });
    }

    const percentagePie = new Pie(
      pieRadius,
      [
        { label: "Correct", value: correctAmount },
        { label: "Incorrect", value: incorrectAmount },
      ],
      { legend: true }
    );

    result.push([
      chalk.whiteBright(startCase(type.toLowerCase())),
      chalk.greenBright(correctAmount),
      chalk.redBright(incorrectAmount),
      percentagePie.toString(),
    ]);

    totalCorrect = totalCorrect + correctAmount;
    totalIncorrect = totalIncorrect + incorrectAmount;
  });

  const percentagePie = new Pie(
    pieRadius,
    [
      { label: "Correct", value: totalCorrect },
      { label: "Incorrect", value: totalIncorrect },
    ],
    { legend: true }
  );

  result.push([
    chalk.whiteBright("Total"),
    chalk.greenBright(totalCorrect),
    chalk.redBright(totalIncorrect),
    percentagePie.toString(),
  ]);

  return json ? data : result;
}

function getSummaryTables(props) {
  return [generateUnofficialTable(props), generateSummaryTable(props)];
}

function getGrade(percentage) {
  const A_MINUS = 93;
  const B_MINUS = 85;
  const C_MINUS = 75;
  const D_MINUS = 70;

  if (percentage >= A_MINUS) {
    return "A";
  } else if (percentage >= B_MINUS) {
    return "B";
  } else if (percentage >= C_MINUS) {
    return "C";
  } else if (percentage >= D_MINUS) {
    return "D";
  } else {
    return "F";
  }
}

class ScorecardCommand extends Command {
  async run() {
    const { flags } = this.parse(ScorecardCommand);
    const site = flags.site;
    const tokens = flags.tokens;
    const json = flags.json;
    const output = flags.output;

    try {
      new URL(site);
    } catch (error) {
      this.error(
        chalk.redBright(`The provide site is not a valid url: ${site}`)
      );
    }

    let specs;

    try {
      fs.readFileSync(tokens, "utf-8");
      const relativeTokensPath = path.relative(__dirname, tokens);
      specs = require("./" + relativeTokensPath);
    } catch (error) {
      this.error(
        chalk.redBright(
          `No tokens were found from the provided file path: ${tokens}`
        )
      );
    }

    if (!validateSpecs(tokens)) {
      this.error(
        `The provided specs are not valid. The specs should be formatted as key-value tokens: ${tokens}`
      );
    }

    if (json) {
      try {
        fs.writeFileSync(
          output,
          `Design Scorecard | Generated On ${new Date()} \n\n`
        );
      } catch (error) {
        this.error(
          chalk.redBright(`The provided output file does not exist: ${output}`)
        );
      }

      const isJSON = path.parse(output).ext.toLowerCase() !== ".json";
      if (isJSON) {
        this.error(
          chalk.redBright(
            `The provided output file is not valid. Please provide a JSON file: ${output}`
          )
        );
      }
    }

    CFonts.say("Design|Scorecard", {
      font: "block",
      align: "center",
      colors: ["system"],
      background: "transparent",
      gradient: ["red", "blue"],
    });

    const css = await extractCss(site);

    const spinner = ora(`Analyzing ${chalk.blueBright(site)}...\n`).start();

    await postcss()
      .use(
        pxToRem({
          propList: [
            "font-size",
            "line-height",
            "letter-spacing",
            "margin-top",
            "margin-bottom",
            "margin-left",
            "margin-right",
            "padding-top",
            "padding-bottom",
            "padding-left",
            "padding-right",
          ],
          unitPrecision: 3,
        })
      )
      .use(expandShorthand)
      .use(
        scorecard({
          onFinished: () => {
            spinner.succeed();

            const [unofficialTable, summaryTable] = getSummaryTables({
              json,
              output,
            });

            const percentage = getPercentage(validScores.length, invalidScores.length);
            const grade = getGrade(percentage);

            if (json) {
              fs.writeFileSync(
                output,
                JSON.stringify({
                  ...unofficialTable,
                  ...summaryTable,
                  total: {
                    correct: validScores.length,
                    incorrect: invalidScores.length,
                    percentage,
                    grade,
                  },
                })
              );
              this.log(
                chalk.greenBright(
                  `⭐ Your scorecard has been outputted: ${output}`
                )
              );
              return null;
            }

            CFonts.say("Unofficial", {
              font: "grid",
              align: "left",
              colors: ["yellow", "#333"],
              background: "transparent",
            });
            this.log(unofficialTable.toString());

            CFonts.say("Scoring", {
              font: "grid",
              align: "left",
              colors: ["red", "#333"],
              background: "transparent",
            });
            this.log(summaryTable.toString());

            CFonts.say("Grade", {
              font: "grid",
              align: "left",
              colors: ["cyan", "#333"],
              background: "transparent",
            });
            
            CFonts.say(grade, {
              font: "block",
              align: "left",
              colors: ["system"],
              background: "transparent",
            });
          },
          onInvalid: (score) => {
            invalidScores.push(score);
          },
          onValid: (score) => {
            validScores.push(score);
          },
          specs,
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
  site: flags.string({
    char: "s",
    description: "site url to analyze",
    required: true,
  }),
  tokens: flags.string({
    char: "t",
    description: "relative path to tokens file",
    required: true,
  }),
  json: flags.boolean({
    char: "j",
    description: "flag to enable printing score as a JSON blob",
    default: false,
    required: false,
  }),
  output: flags.string({
    char: "o",
    description: "relative path for JSON output",
    required: false,
    dependsOn: ["json"],
  }),
};

ScorecardCommand.title = "Scorecard";

module.exports = ScorecardCommand;
