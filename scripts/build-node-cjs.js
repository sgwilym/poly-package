require("esbuild")
  .build({
    entryPoints: ["src/index.node.js"],
    bundle: true,
    platform: 'node',
    outfile: "dist/poly.node.cjs.js",
    external: ['dot-beat-time'],
    
    
  })
  .catch((err) => {
    console.error(err);
    process.exit(1)});
