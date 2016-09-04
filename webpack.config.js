module.exports = {
  entry: {
    ResizableIframe: './index.js'
  },
  output: {
    filename: '[name].js',
    path: './dist',
    library: '[name]',
    libraryTarget: 'var'
  }
};
