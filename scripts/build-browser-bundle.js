const plugins = require("./plugins")

require("esbuild")
  .build({
    entryPoints: ["src/index.browser.js"],
    bundle: true,
    format: 'iife',
    outfile: "dist/poly.browser.bundled.js",
    plugins: [plugins.http],
    globalName: 'Poly'
  })
  .catch(() => process.exit(1));
