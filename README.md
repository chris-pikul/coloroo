# Coloroo

Work-in-progress TypeScript/JavaScript library for colors, color-space, conversion, and manipulation.

## Motivation (or Why This Library?)

I wanted a modern feeling API that uses TypeScript as a first-class citizen for Color
containers and manipulation. Other libraries I've seen seem to have slightly complicated APIs, or the TypeScript definitions are an after-thought, or the code bases for them in general are generally hard to read.

Additional to this, I wanted to explore as many color-spaces and encoding formats as
I could for this project while remaining flexible to add more as needed.

## Installation

Like most libraries, it's the same ol' story:

```bash
npm install --save coloroo
yarn add coloroo
```

## Usage

Coloroo supports CommonJS, ES Modules, and browsers. The `package.json` should be accomidating for both CJS, and ESM. For the browser distributable, it is generated
from `./lib/esm/` using ESBuild, and can be found in the `./dist` folder.

For the remainder of these docs, ESM is assumed but you should be able to convert to CJS syntax if you need.

### Color Spaces

| Color Space | Class Name | Quick Doc |
| ----------- | ---------- | --------- |
| Named Colors | [NamedColors](src/NamedColors.ts) | [Doc](NamedColors.md) |
| RGB | [ColorRGB](src/RGB.ts) | [Doc](ColorRGB.md) |

## Test Coverage

Testing is provided by Mocha/Chai, with coverage reporting done by Istanbul/NYC.

Current test coverage is as follows:

File             | % Stmts | % Branch | % Funcs | % Lines |
-----------------|---------|----------|---------|---------|
All files        |     100 |      100 |     100 |     100 |
 src             |     100 |      100 |     100 |     100 |
  NamedColors.ts |     100 |      100 |     100 |     100 |
  RGB.ts         |     100 |      100 |     100 |     100 |
 src/utils       |     100 |      100 |     100 |     100 |
  math.ts        |     100 |      100 |     100 |     100 |
  params.ts      |     100 |      100 |     100 |     100 |
  regexp.ts      |     100 |      100 |     100 |     100 |

## Contibuting

I welcome contributions if you have some. Currently I don't have any formatting requirements since this is mostly a pasion project at the time. So I suppose, just fill out an issue or PR as per usual for repos.

## License

Under the MIT licens, see `LICENSE` file for more details.
