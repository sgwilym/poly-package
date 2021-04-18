import { importMapPlugin } from './plugins.js';
import esbuild from 'esbuild'

esbuild
  .build({
    entryPoints: ["src/index.browser.ts"],
    bundle: true,
    format: "esm",
    outfile: "dist/poly.browser.js",
    plugins: [importMapPlugin],
    external: ["https://cdn.skypack.dev/dot-beat-time"],
  })
  .catch(() => process.exit(1));
