const { join } = require("path");

const isDev = process.env.NODE_ENV === "development";

const rootDir = join(__dirname, "..");
const staticDir = join(rootDir, ".");

module.exports = {
  entry: "./index.jsx",
  mode: isDev ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|otf|woff|woff2)$/i,
        loader: "url-loader",
        options: {
          limit: 9192,
        },
      },
    ],
  },
  output: {
    filename: "index.js",
    path: join(staticDir, "docs"),
    publicPath: "",
  },
};
