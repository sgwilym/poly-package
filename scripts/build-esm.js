import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/index.browser.ts"],
    bundle: true,
    format: "esm",
    outfile: "dist/poly.esm.js",
    target: ["esnext"],
    external: ["dot-beat-time"],
  })
  .catch(() => process.exit(1));
