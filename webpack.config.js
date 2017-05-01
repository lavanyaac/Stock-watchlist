var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

var config = {
    // TODO: Add common Configuration
    module: {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};

var stockConfig = Object.assign({}, config, {
    name: "stock",
    entry: `${SRC_DIR}/stock/index.jsx`,
    output: {
      filename: 'stock-bundle.js',
      path: DIST_DIR
    },
});
var loginConfig = Object.assign({}, config,{
    name: "login",
    entry: `${SRC_DIR}/login/index.jsx`,
    output: {
      filename: 'login-bundle.js',
      path: DIST_DIR
    },
});

// Return Array of Configurations
module.exports = [
    stockConfig, loginConfig,     
];
