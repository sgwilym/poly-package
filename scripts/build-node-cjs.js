require("esbuild")
  .build({
    entryPoints: ["src/index.node.js"],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: "dist/poly.node.js",
    external: ['dot-beat-time']
  })
  .catch((err) => {
    console.error(err);
    process.exit(1)});
