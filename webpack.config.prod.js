process.env.NODE_ENV = "production";
process.env.NODE_PATH = ".";

const _ = require("lodash");
const path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const TerserPlugin = require("terser-webpack-plugin");

const entry = {};
const files = glob.sync("server/web/views/react/*/index.js");
_.each(files, (file) => {
  const splitFile = file.split("/");
  try {
    entry[splitFile[4]] = path.join(__dirname, "/", file);
  } catch (err) {
    console.error(err); // eslint-disable-line
  }
});

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = "/";
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = false;

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (process.env.NODE_ENV !== "production") {
  throw new Error("Production builds must have NODE_ENV=production.");
}

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  mode: "production",
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: shouldUseSourceMap ? "source-map" : false,

  // Add your new react files here
  entry,
  output: {
    path: path.join(__dirname, "/dist/server/web/public/js/react"),
    filename: "[name].js", // [name] is the key of the entry point up above
    chunkFilename: "[name].[chunkhash:8].chunk.js",
    publicPath,

    // Point sourcemap entries to original disk location (format as URL on Windows)
    // devtoolModuleFilenameTemplate: (info) => {
    //   return path
    //     .relative(paths.appSrc, info.absoluteResourcePath)
    //     .replace(/\\/g, '/');
    // },
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, "/server"),
        exclude: [/node_modules/, /__tests__/],
        loader: require.resolve("babel-loader"),
        options: {
          presets: ["react-app"],
          plugins: [
            "transform-flow-strip-types",
            "transform-es2015-modules-commonjs",
            "transform-object-rest-spread",
            "transform-decorators-legacy",
            "recharts",
          ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: shouldUseSourceMap,
      }),
    ],
  },

  plugins: [
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
};
