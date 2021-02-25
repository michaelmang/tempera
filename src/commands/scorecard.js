const { Command, flags } = require("@oclif/command");

class ScorecardCommand extends Command {
  async run() {
    const { flags } = this.parse(ScorecardCommand);
    const site = flags.site;
    try {
      new URL(site);
    } catch (error) {
      this.error(`The provide site is not a valid url: ${site}`);
    }

    this.log(`hello ${site} from ./src/commands/hello.js`);
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
