/* global __dirname */

const CleanPlugin = require('clean-webpack-plugin')

const PATHS = require('./webpack.paths')

module.exports = {
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: 'build.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        root: [
            PATHS.src
        ],
        fallback: [PATHS.nodeModules],
        alias: {
            'static': PATHS.static,
            'scss': PATHS.scss,
            'utils': PATHS.utils,
            'components': PATHS.components,
            'services': PATHS.services,
            'store/modules': PATHS.storeModules
        }
    },
    externals: {
        electron: true
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        },
        {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        },
        {
            test: /\.json$/,
            loader: 'json'
        },
        {
            test: /\.(sass|scss)$/,
            loaders: ['style', 'css?minimize&autoprefixer=1', 'sass']
        }]
    },
    node: {
        __dirname: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        setImmediate: false
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
