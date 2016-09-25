var path = require('path');

module.exports = {
  entry: path.join(process.cwd(), 'client/js/main.js'),
  output: {
    path: './client/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel'
      }
    ]
  }
}