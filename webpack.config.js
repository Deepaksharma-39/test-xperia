const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      // JavaScript/JSX rule
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      // CSS Modules rule
      {
        test: /\.css$/i,
        include: /\.module\.css$/, // Only CSS module files
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // Enable CSS Modules
            },
          },
        ],
      },
      // Regular global CSS rule
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/, // Exclude CSS Modules
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Allow importing .js and .jsx files without specifying the extension
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Point to your HTML template
    }),
  ],
};
