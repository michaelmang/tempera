import { parseArgsStringToArgv } from "string-argv";
import scorecard from "tempera/src/commands/scorecard";

const SITE = "https://www.npmjs.com/package/string-argv";

async function main() {
  const argv = parseArgsStringToArgv(
    `--tokens tokens.js --site ${SITE} --json --output output.json`
  );
  scorecard.run(argv);
}

main();