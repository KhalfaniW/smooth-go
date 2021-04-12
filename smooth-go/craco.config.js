module.exports = {
  webpack: {
    configure: {
      output: {
        // compile to one file
        filename: "static/js/[name].js",
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: {
          chunks(chunk) {
            return false;
          },
        },
      },
    },
  },
};
