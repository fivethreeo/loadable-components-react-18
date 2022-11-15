const resolveExternal = require("./externalsutils").resolveExternal;
const path = require("path");
const esmExternals = 'loose';
const looseEsmExternals = esmExternals === 'loose';


async function handleExternals(context, request, dependencyType, getResolve) {
    // We need to externalize internal requests for files intended to
    // not be bundled.
    const isLocal = request.startsWith('.') ||
        // Always check for unix-style path, as webpack sometimes
        // normalizes as posix.
        path.posix.isAbsolute(request) ||
        // When on Windows, we also want to check for Windows-specific
        // absolute paths.
        (process.platform === 'win32' && path.win32.isAbsolute(request));
    // Relative requires don't need custom resolution, because they
    // are relative to requests we've already resolved here.
    // Absolute requires (require('/foo')) are extremely uncommon, but
    // also have no need for customization as they're already resolved.
    if (!isLocal) {
        /*         if (/^(?:next$|react(?:$|\/))/.test(request)) {
        return `commonjs ${request}`;
      }
*/
        /*        if (pluginOptions.notExternalsCallback && pluginOptions.notExternalsCallback(context, request)) {
        return;
      } */
    }
    // When in esm externals mode, and using import, we resolve with
    // ESM resolving options.
    const isEsmRequested = dependencyType === 'esm';
    const isLocalCallback = (localRes) => {
        // Makes sure dist/shared and dist/server are not bundled
        // we need to process shared `router/router` and `dynamic`,
        // so that the DefinePlugin can inject process.env values
        /*  const isNextExternal =
        /next[/\\]dist[/\\](shared|server)[/\\](?!lib[/\\](router[/\\]router|dynamic))/.test(
          localRes
        );
      if (isNextExternal) {
        // Generate Next.js external import
        const externalRequest = path.posix.join(
          "next",
          "dist",
          path
            .relative(
              // Root of Next.js package:
              path.join(__dirname, ".."),
              localRes
            )
            // Windows path normalization
            .replace(/\\/g, "/")
        );
        return `commonjs ${externalRequest}`;
      } else { */
        // We don't want to retry local requests
        // with other preferEsm options
        // }
    };
    const resolveResult = await resolveExternal(process.cwd(), esmExternals, context, request, isEsmRequested, getResolve, isLocal ? isLocalCallback : undefined);
    if ('localRes' in resolveResult) {
        return resolveResult.localRes;
    }
    const { res, isEsm } = resolveResult;
    // If the request cannot be resolved we need to have
    // webpack "bundle" it so it surfaces the not found error.
    if (!res) {
        return;
    }
    // ESM externals can only be imported (and not required).
    // Make an exception in loose mode.
    if (!isEsmRequested && isEsm && !looseEsmExternals) {
        throw new Error(`ESM packages (${request}) need to be imported. Use 'import' to reference the package instead. https://nextjs.org/docs/messages/import-esm-externals`);
    }
    const externalType = isEsm ? 'module' : 'commonjs';
    /*
  if (
    res.match(/next[/\\]dist[/\\]shared[/\\](?!lib[/\\]router[/\\]router)/)
  ) {
    return `${externalType} ${request}`;
  }
*/
    // Default pages have to be transpiled
    if (
    // res.match(/[/\\]next[/\\]dist[/\\]/) ||
    // This is the @babel/plugin-transform-runtime "helpers: true" option
    res.match(/node_modules[/\\]@babel[/\\]runtime[/\\]/)) {
        return;
    } /*
  // Webpack itself has to be compiled because it doesn't always use module relative paths
  if (
    res.match(/node_modules[/\\]webpack/) ||
    res.match(/node_modules[/\\]css-loader/)
  ) {
    return;
  }
*/
    // Anything else that is standard JavaScript within `node_modules`
    // can be externalized.
    if (/node_modules[/\\].*\.[mc]?js$/.test(res)) {
        return `${externalType} ${request}`;
    }
    // Default behavior: bundle the code!
}
module.exports = [
        ({ context, request, dependencyType, getResolve, }) => {
            //            console.log(request);
            return handleExternals(context, request, dependencyType, (options) => {
                const resolveFunction = getResolve && getResolve(options);
                return (resolveContext, requestToResolve) => new Promise((resolve, reject) => {
                    resolveFunction &&
                        resolveFunction(resolveContext, requestToResolve, (err, result, resolveData) => {
                            var _a;
                            if (err)
                                return reject(err);
                            if (!result)
                                return resolve([null, false]);
                            const isEsm = /\.js$/i.test(result)
                                ? ((_a = resolveData === null || resolveData === void 0 ? void 0 : resolveData.descriptionFileData) === null || _a === void 0 ? void 0 : _a.type) === 'module'
                                : /\.mjs$/i.test(result);
                            resolve([result, isEsm]);
                        });
                });
            });
        },
    ];