const plugins = require("./plugins")

require("esbuild")
  .build({
    entryPoints: ["src/index.browser.js"],
    bundle: true,
    format: 'esm',
    outfile: "dist/poly.browser.bundled.js",
    plugins: [plugins.http],
  })
  .catch(() => process.exit(1));
