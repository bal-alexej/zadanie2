const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

//Настройка pug  
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};
//

const optimization = (extra) => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  if (extra) {
    loaders.push(extra);
  }

  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    "css-loader",
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: ["@babel/preset-env"],
    plugins: ["@babel/plugin-proposal-class-properties"],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: babelOptions(),
    },
  ];

  if (isDev) {
    loaders.push("eslint-loader");
  }

  return loaders;
};

const plugins = () => {
  const base = [
    // new HTMLWebpackPlugin({
    //   template: "./index.html",
    //   minify: {
    //     collapseWhitespace: isProd,
    //   },
    // }),
    //Настройка pug
    new HTMLWebpackPlugin({
      template: PATHS.src + '/pug/pages/index.pug'
    }),
    //
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/img/i.ico"), //откуда и что перемещать,
          to: path.resolve(__dirname, "dist"), //куда перемещать
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ];
  //lodash
  // if (isProd) {
  //   base.push(new BundleAnalyzerPlugin());     
  // }

   return base;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: ["@babel/polyfill", "./index.js"],
    analytics: "./analytics.ts",
  },
  output: {
    filename: filename("js"),

    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", "json"], //файлы воспринимаемые webpack по умолчанию
    // alias: { "@s": path.resolve(__dirname, "src/stules") }, //удобное указание до пути файла
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
    // watchContentBase: true,
		// inline: true,
		// hotOnly: false,
		// liveReload: isDev
  },
  devtool: isDev ? "source-map" : " ",
  plugins: plugins(),

  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },

      {
        test: /\.less$/,
        use: cssLoaders("less-loader"),
      },

      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("sass-loader"),
      },

      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"],
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.scv$/,
        use: ["scv-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-typescript"),
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-react"),
        },
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true
        }
      },
    ],
  },
};
