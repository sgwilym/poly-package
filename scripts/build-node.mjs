import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/index.node.ts"],
    bundle: true,
    platform: "node",
    outfile: "dist/poly.node.mjs",
    format: "esm",
    external: ["dot-beat-time"],
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
