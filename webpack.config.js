// Node Update
require('babel-polyfill');
bourbon = require('node-bourbon').includePaths;

module.exports = {
  context: __dirname + "/app",
  entry: {
    javascript: "./app.js",
    html: "./index.html"
  },
  module:{
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      { test: /\.png$/, loader: 'url?limit=100000' },
      { test: /\.jpg$/, loader: 'file' },
      { test: /\.svg/, loader:  'file' },
      { test: /\.scss$/, loader: 'style!css?modules!sass?includePaths[]=' + bourbon},
      { test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
    ]
  },
  output: {
    filename: "app.js",
    path: __dirname + "/dist"
  },
}
