/* global __dirname */

const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const webpack = require('webpack');

module.exports = webpackMerge(baseConfig, {
    plugins: [
        // short-circuits all Vue.js warning code
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // minify with dead-code elimination
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // optimize module ids by occurence count
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
});
