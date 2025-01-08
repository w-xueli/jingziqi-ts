const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    publicPath: "/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      // TypeScript 配置
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader, // 将 CSS 插入到 DOM 中
          "css-loader", // 解析 CSS 文件
          "postcss-loader", // 处理Postcss文件
          "sass-loader", // 处理scss文件
        ],
      },
      // 处理图片文件
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i, // 匹配图片文件
        type: "asset", // 使用 Asset 模块来处理图片 无需额外的 loader
        parser: {
          dataUrlCondition: {
            maxSize: 8192, // 图片大小小于 8KB 时转换为 Base64
          },
        },
        generator: {
          filename: "images/[name]-[contenthash:8][ext][query]", // 输出路径和文件名
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      publicPath: "/",
    }),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // 指定 public 文件夹作为静态资源目录
    },
    compress: true,
    hot: true,
    port: 9000, // 你可以选择你想要的端口
    open: true, // 自动打开浏览器
  },
};
