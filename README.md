<h1 align="center">🖼️ Tempera 🖼️</h1>

<p align="center">
  <a href="https://tempera.netlify.app">
    <img alt="tempera" src="https://dam-13749.kxcdn.com/wp-content/uploads/2017/01/simonetta-vespucci.jpg" width="750">
  </a>
</p>

<p align="center">
  A CLI toolkit for aiding design tokens adoption.
</p>

<p align="center">
  <a href="https://tempera.netlify.app">
    View Docs
  </a>
</p>

<p align="center">
  <a href="https://oclif.io"><img alt="Oclif" src="https://img.shields.io/badge/cli-oclif-brightgreen.svg"></a>
  <a href="https://app.netlify.com/sites/tempera/deploys"><img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/733b8d33-26d3-4182-be30-388b8bc57737/deploy-status"></a>
  <a href="https://github.com/michaelmang/tempera/actions/workflows/publish.yml"><img alt="Actions Status" src="https://github.com/michaelmang/tempera/actions/workflows/publish.yml/badge.svg"></a>
  <a href="https://npmjs.org/package/tempera"><img alt="Version" src="https://img.shields.io/npm/v/tempera.svg"></a>
  <a href="https://npmjs.org/package/tempera"><img alt="Downloads" src="https://img.shields.io/npm/dw/tempera.svg"></a>
  <a href="https://github.com/michaelmang/tempera/blob/master/package.json"><img alt="Downloads" src="https://img.shields.io/npm/l/tempera.svg"></a>
</p>

<!-- toc -->
* [Usage](#usage)
* [Contributing](#contributing)
* [Packages](#packages)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g tempera
$ tempera COMMAND
running command...
$ tempera (-v|--version|version)
tempera/0.0.1 darwin-x64 node-v14.15.0
$ tempera --help [COMMAND]
USAGE
  $ tempera COMMAND
...
```
<!-- usagestop -->

# Contributing

🤠  Howdy, developer! Thanks for being willing to contribute!

## Project setup

1.  Fork and clone the repo
2.  Run `yarn install` to install dependencies
3.  Create a branch for your PR with `git checkout -b pr/your-branch-name`

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/michaelmang/tempera.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```

## Committing and Pushing changes

There are currently no tests but please document manual testing on PRs with your changes. 

## Help needed

Please checkout the [the open issues][issues].

Also, please watch the repo and respond to questions/bug reports/feature
requests! Thanks!

[issues]: https://github.com/michaelmang/tempera/issues

# Packages

The underlying packages that support Tempera are publicly accessible.

You are welcome and encouraged to use these packages directly should you need a custom solution.

🚀 [Contributing](/docs/contributing) to these packages is also welcome.

## css-types

Utilities to categorize your CSS.

### Installation

```bash
yarn add @tempera/css-types
```

### Usage

```js
const {
  // Example: matchers.SPACING
  // Contains a list of regex matchers to help match common types in CSS
  matchers,
  // example: getMatcher(postcssProperty)
  // Returns a regex matcher fitting for the provided property
  getMatcher,
  // Example: types.SPACING
  // Contains a list of common types in CSS
  types,
  // Example: getType(postcssProperty)
  // Returns a common type fitting for the provided property
  getType, 
} = require("@tempera/css-types");
```

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/css-types)

## postcss-scorecard

A PostCSS plugin that exposes hooks into design token adoption validation.

### Installation

```bash
yarn add @tempera/postcss-scorecard
```

### Usage

```js
const pxToRem = require("postcss-pxtorem");
const expandShorthand = require("postcss-shorthand-expand");

await postcss()
  .use(
    pxToRem()
  )
  .use(expandShorthand)
  .use(
    scorecard({
      onInvalid: (score) => {
        // do something when CSS property is not an official spec
      },
      onValid: (score) => {
        // do something when CSS property is an official spec
      },
      onFinished: () => {
        // do something after validation finishes
      },
      specs, // the official design tokens
    })
  )
  .process(css, { from: undefined });
```

[View the source](https://github.com/michaelmang/tempera/tree/master/packages/postcss)
