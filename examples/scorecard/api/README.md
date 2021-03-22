# Tempera Scorecard API Example

An example of using Tempera's `scorecard` command as an API.

## Running the Example

1. Checkout the `examples/scorecard/api` directory locally.

2. Provide a sample `tokens.js` file to the root of the project.

### Tokens

The example expects these specs/tokens to be in the [javascript/es6 format which you can generate using Style Dictionary](https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6) except exported as CommonJS modules.

In other words, flat CommonJS modules in PascalCase are expected.

Example:

```js
module.exports.ColorBackgroundBase = "#ffffff";
module.exports.ColorBackgroundAlt = "#fcfcfcfc";
```

Support for tokens in ES6 format is on the roadmap.

3. Install the dependencies.

```bash
yarn install
```

4. Run the test.

```bash
yarn test
```

The results will be in the `output.json` file at the root of the working directory. 

## Implementing the API

1. Install the dependencies.

```bash
yarn add tempera
yarn add string-argv
```

2. Import the `scorecard` command from the `tempera` dependency. 

3. Pass the `--tokens`, `--site`, `--json`, and `--output` flags using the `parseArgsStringToArgv` method.

3. Run the `scorecard.run` method with the generated argv parameter.

4. Read the generated scorecard from the JSON object in the specified output file. 

5. Do something with the scorecard represented as a JSON object.

## Example

```js
import { parseArgsStringToArgv } from "string-argv";
import scorecard from "tempera/src/commands/scorecard";

const SITE = "https://www.npmjs.com/package/string-argv";

function generateScorecard() {
  const argv = parseArgsStringToArgv(
    `--tokens tokens.js --site ${SITE} --json --output output.json`
  );
  scorecard.run(argv);
}

await generateScorecard();

// read the generated scorecard from the JSON output
const results = fs.readFileSync('./output.json', 'utf8');

// do something with scorecard results
```

[View the example](https://github.com/michaelmang/tempera/tree/master/examples/scorecard/api/index.js)

