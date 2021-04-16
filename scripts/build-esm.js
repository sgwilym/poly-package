const plugins = require("./plugins")

require("esbuild")
  .build({
    entryPoints: ["src/index.browser.js"],
    bundle: true,
    format: 'esm',
    outfile: "dist/poly.esm.js",
    target: ['esnext'],
    external: ['dot-beat-time']
  })
  .catch(() => process.exit(1));
