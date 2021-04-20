import { httpPlugin, conditionsPlugin, importMapPlugin } from "./plugins.mjs";
import esbuild from "esbuild";

const baseConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
};

function build(config) {
  esbuild
    .build({
      ...baseConfig,
      ...config,
    })
    .then(() => {
      console.log(`📦 ${config.outfile}`);
    })
    .catch((err) => {
      console.error(`❌ Problem building ${config.outfile}`)
      console.error(err);
      process.exit(1);
    });
}

const configs = [
  // browser, bundled
  {
    format: "iife",
    outfile: "dist/poly.browser.bundled.js",
    plugins: [conditionsPlugin, httpPlugin],
    globalName: "Poly",
    conditions: ["browser"],
  },
  // browser, unbundled
  {
    format: "esm",
    outfile: "dist/poly.browser.js",
    plugins: [conditionsPlugin, importMapPlugin],
    external: ["https://cdn.skypack.dev/dot-beat-time"],
    conditions: ["browser"],
  },
  // deno
  {
    format: "esm",
    outfile: "dist/poly.deno.js",
    plugins: [conditionsPlugin, importMapPlugin],
    external: ["https://cdn.skypack.dev/dot-beat-time"],
    conditions: ["deno"],
  },
  // neutral
  {
    format: "esm",
    outfile: "dist/poly.esm.js",
    target: ["esnext"],
    external: ["dot-beat-time"],
  },
  // node, CommonJS
  {
    platform: "node",
    outfile: "dist/poly.node.cjs",
    external: ["dot-beat-time"],
    plugins: [conditionsPlugin],
    conditions: ["node"],
  },
  // node, ESM
  {
    platform: "node",
    outfile: "dist/poly.node.mjs",
    format: "esm",
    external: ["dot-beat-time"],
    plugins: [conditionsPlugin],
    conditions: ["node"],
  },
];

configs.forEach(build);
