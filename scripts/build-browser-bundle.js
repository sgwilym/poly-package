import { httpPlugin } from "./plugins.js";
import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/index.browser.ts"],
    bundle: true,
    format: "iife",
    outfile: "dist/poly.browser.bundled.js",
    plugins: [httpPlugin],
    globalName: "Poly",
  })
  .catch(() => process.exit(1));
