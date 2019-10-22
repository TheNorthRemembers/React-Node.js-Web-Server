process.env.NODE_ENV = "development";
process.env.NODE_PATH = ".";

const _ = require("lodash");
const path = require("path");
const webpack = require("webpack");
const glob = require("glob");

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

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  mode: "development",
  // Don't attempt to continue if there are any errors.
  bail: true,
  // This is a default provided by running webpack in development mode,
  // but we're setting it explicitly here to make it more clear what
  // source map tool we're using.
  devtool: "eval",
  // Add your new react files here
  entry,
  output: {
    path: path.join(__dirname, "/server/web/public/js/react"),
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
