# poly-package

This is some work I did figuring out how I could create a codebase which could:

- Output formats appropriate for a given environment (e.g. ESM for browsers, CJS for node)
- Use environment-appropriate dependencies (e.g node_modules in node, URL imports in browsers)
- Accommodate implementations native to the environment (e.g. one Sqlite driver for Node, a different one for Deno, none for the browser)

I think I have something which ticks these boxes? Just trying to figure out some patterns here.

## Setup

`npm install && npm run build`

This will build the codebase for these different targets and output the results in `/dist`.

## Orientation

### Source

`src` contains four different entrypoints:

- index.js
- index.browser.js
- index.node.js
- index.deno.js

All of these entrypoints export a function called `time`, defined in `src/time.js`. I put this here because reusing code across all these different versions is a hard requirement.

This file uses an external dependency, which we'll come back to later.

Each entrypoint has their own implementations of a function called `SpecialGoodbye`. This is here because being able to have environment specific versions of certain bits of code is a hard requirement.

### Bundling

Bundling is done with `esbuild`, with scripts for different entrypoints in the `scripts` folder.

For the Deno and browser builds, a custom plugin is used which looks for matching names in `import-map.json`. If there's a match, the import is transformed to the remote URL.

There's also a http plugin I nabbed from the esbuild docs which is not really needed here, but which is used to build the bundled browser build and saves me making another entrypoint.

### Output

`esbuild` is used to output several different versions of this codebase:

- `poly.browser.bundled.js`: This can be used via a script tag in a browser, with the external dependency bundled in.
- `poly.browser.js`: This can be used with a script tag in a browser with the `type="module"`. The external dependency is resolved as a remote URL (e.g. `https://cdn.skypack.dev/dot-beat-time`)
- `poly.esm.js`: An ESM version of the module with external dependencies referred to by local name (e.g. `dot-beat-time`)
- `poly.deno.js`: This can be used in Deno. Local imports have been transformed to URL imports.
- `poly.node.js`: This is used by Node when imported using `import`.
- `poly.node.cjs.js`: This is used by Node when imported using `require`.
