# Tempera

A CLI toolkit for aiding design tokens adoption.

![](https://dam-13749.kxcdn.com/wp-content/uploads/2017/01/simonetta-vespucci.jpg)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/tempera.svg)](https://npmjs.org/package/tempera)
[![Downloads/week](https://img.shields.io/npm/dw/tempera.svg)](https://npmjs.org/package/tempera)
[![License](https://img.shields.io/npm/l/tempera.svg)](https://github.com/michaelmang/tempera/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g tempera
$ tempera COMMAND
running command...
$ tempera (-v|--version|version)
tempera/0.0.0 darwin-x64 node-v14.15.0
$ tempera --help [COMMAND]
USAGE
  $ tempera COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`tempera scorecard`](#tempera-scorecard)
- [`tempera help [COMMAND]`](#tempera-help-command)

## `tempera scorecard`

Gather metrics around the adoption of a design system.

```
USAGE
  $ tempera scorecard

OPTIONS
  -s, --site=site  site url to analyze
  -t, --tokens=tokens  relative path to tokens file
  -j, --json=json  (optional) flag to enable printing output as a JSON blob
  -o, --output=output  (optional) relative path for JSON output; requires -j, --json to be enabled

DESCRIPTION
  ...
  Scorecard analyzes a web app or web page, collecting
  design system adoption metrics and insights for adoption.
```

_See code: [src/commands/hello.js](https://github.com/michaelmang/tempera/blob/v0.0.0/src/commands/hello.js)_

## `tempera help [COMMAND]`

display help for tempera

```
USAGE
  $ tempera help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

<!-- commandsstop -->
