import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.resolve();

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'date.js',
    library: {
      type: 'module',
    },
    module: true,
    environment: {
        module: true
    },
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults', modules: false }],
            ],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: { minimize: false },
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { esModule: false },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'date.css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.scss', '.css', '.html'],
  },
};
