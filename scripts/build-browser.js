const plugins = require("./plugins")

require("esbuild")
  .build({
    entryPoints: ["src/index.browser.js"],
    bundle: true,
    format: 'esm',
    outfile: "dist/poly.browser.js",
    plugins: [plugins.deps],
    external: ['https://cdn.skypack.dev/dot-beat-time']
  })
  .catch(() => process.exit(1));
