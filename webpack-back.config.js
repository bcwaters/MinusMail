const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  target: "node",
  entry: {
    app: ["./src/server.js"]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle-back.js"
  },
  module: {
    rules: [
	 {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
	   { 
      test: /\.svg$/, 
      loader: 'xml-loader' 
	},
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
 	
    ]
  },
  externals: [nodeExternals()],
};