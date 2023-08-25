module.exports = {
    entry: './src/index.js', // Change this to your client entry file
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
  };
  