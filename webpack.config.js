require('es6-promise').polyfill();

var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config =
    {
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        },
        entry: {
            index: APP_DIR + '/js/sites/index.jsx',
            authenticated: APP_DIR + '/js/sites/authenticated.jsx'
        },
        output: {
            path: BUILD_DIR,
            filename: '[name].bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?/,
                    include: APP_DIR,
                    loader: 'babel'
                },
                {
                    test: /\.less$/,
                    loader: "style-loader!css-loader!less-loader"
                },
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        }
    };

module.exports = config;