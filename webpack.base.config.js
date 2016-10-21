/* global __dirname */

const CleanPlugin = require('clean-webpack-plugin')

const PATHS = require('./webpack.paths')

module.exports = {
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: 'build.js'
    },
    target: 'electron',
    resolve: {
        root: [
            PATHS.src
        ],
        fallback: [PATHS.nodeModules],
        alias: {
            'static': PATHS.static,
            'scss': PATHS.scss,
            'utils': PATHS.utils,
            'components': PATHS.components
        }
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        },
        {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(sass|scss)$/,
            loaders: ['style', 'css?minimize&autoprefixer=1', 'sass']
        }]
    },
    vue: {
        loaders: {
            sass: 'style!css?minimize&autoprefixer=1!sass?indentedSyntax',
            scss: 'style!css?minimize&autoprefixer=1!sass',
            css: 'style!css?minimize&autoprefixer=1!sass'
        }
    },
    sassLoader: {
        includePaths: [PATHS.scss]
    },
    plugins: [
        new CleanPlugin(['build/*.hot-update.*'])
    ]
}
