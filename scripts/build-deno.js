const plugins = require("./plugins")

require("esbuild")
  .build({
    entryPoints: ["src/index.deno.js"],
    bundle: true,
    format: 'esm',
    outfile: "dist/poly.deno.js",
    plugins: [plugins.deps],
    external: ['https://cdn.skypack.dev/dot-beat-time']
  })
  .catch(() => process.exit(1));
