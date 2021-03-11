import fs from "fs";
import startCase from "lodash.startcase";
import path from "path";

const PLUGINS_DIR = "./src/stubs/tailwindcss/plugins";

function main() {
  let result = {};

  fs.readdirSync(path.relative(process.cwd(), PLUGINS_DIR)).forEach((file) => {
    const filePath = path.relative(process.cwd(), `${PLUGINS_DIR}/${file}`);
    const contents = fs.readFileSync(filePath, "utf-8");

    const hasNameClass = contents.match("nameClass");
    if (!hasNameClass) {
      return null;
    }

    const plugin = path.parse(file).name;
    const pluginName = startCase(plugin === "textColor" ? "color" : plugin)
      .split(" ")
      .join("");
    const matchClassName = /'\w*'(?=, \w*\))/gm;
    const className = contents.match(matchClassName);

    if (!className || !className[0]) {
      return null;
    }

    fs.appendFileSync(
      path.relative(process.cwd(), "./src/stubs/plugin-class-name-mapping.js"),
      `export const ${pluginName} = "${className[0].replace(/'/g, "")}";\n`
    );
  });

  return result;
}

main();
