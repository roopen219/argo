/* global __dirname */

const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const PATHS = require('./webpack.paths')

module.exports = webpackMerge(baseConfig, {
    devServer: {
        outputPath: PATHS.build,
        contentBase: PATHS.build
    },
    devtool: 'source-map'
})
