import { importMapPlugin } from "./plugins.js";
import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/index.deno.ts"],
    bundle: true,
    format: "esm",
    outfile: "dist/poly.deno.js",
    plugins: [importMapPlugin],
    external: ["https://cdn.skypack.dev/dot-beat-time"],
  })
  .catch(() => process.exit(1));
