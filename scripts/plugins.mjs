import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import importMap from "../import-map.json";

function conditionedPath(condition, pathStr) {
  return `${pathStr}.${condition}.ts`;
}

export const conditionsPlugin = {
  name: "conditions",
  setup(build) {
    const conditionString = build.initialOptions.conditions.join(".");

    build.onResolve({ filter: /(\.\/|\.\.\/)+[a-zA-Z]*/ }, (args) => {
      // TODO: does this exclude external packages?

      const conditionPath = conditionedPath(conditionString, args.path);

      const exists = fs.existsSync(
        path.resolve(args.resolveDir, conditionPath)
      );

      if (exists) {
        return {
          path: path.resolve(args.resolveDir, conditionPath),
        };
      }

      return {};
    });
  },
};

export const importMapPlugin = {
  name: "importMap",
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      let mapped = importMap[args.path];

      if (mapped) {
        return {
          path: mapped,
          external: true,
        };
      }

      return {};
    });
  },
};

export const httpPlugin = {
  name: "http",
  setup(build) {
    // Intercept import paths starting with "http:" and "https:" so
    // esbuild doesn't attempt to map them to a file system location.
    // Tag them with the "http-url" namespace to associate them with
    // this plugin.
    build.onResolve({ filter: /^https?:\/\// }, (args) => ({
      path: args.path,
      namespace: "http-url",
    }));

    // We also want to intercept all import paths inside downloaded
    // files and resolve them against the original URL. All of these
    // files will be in the "http-url" namespace. Make sure to keep
    // the newly resolved URL in the "http-url" namespace so imports
    // inside it will also be resolved as URLs recursively.
    build.onResolve({ filter: /.*/, namespace: "http-url" }, (args) => ({
      path: new URL(args.path, args.importer).toString(),
      namespace: "http-url",
    }));

    // When a URL is loaded, we want to actually download the content
    // from the internet. This has just enough logic to be able to
    // handle the example import from unpkg.com but in reality this
    // would probably need to be more complex.
    build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
      let contents = await new Promise((resolve, reject) => {
        function fetch(url) {
          console.log(`Downloading: ${url}`);
          let lib = url.startsWith("https") ? https : http;
          let req = lib
            .get(url, (res) => {
              if ([301, 302, 307].includes(res.statusCode)) {
                fetch(new URL(res.headers.location, url).toString());
                req.abort();
              } else if (res.statusCode === 200) {
                let chunks = [];
                res.on("data", (chunk) => chunks.push(chunk));
                res.on("end", () => resolve(Buffer.concat(chunks)));
              } else {
                reject(
                  new Error(`GET ${url} failed: status ${res.statusCode}`)
                );
              }
            })
            .on("error", reject);
        }
        fetch(args.path);
      });
      return { contents };
    });
  },
};
