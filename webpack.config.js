/* global __dirname */

const path = require('path');
const webpack = require('webpack');

const PATHS = {
    app: path.join(__dirname, 'main.js'),
    build: path.join(__dirname, 'build/'),
    src: path.join(__dirname, '.'),
    scss: path.join(__dirname, 'static/scss/'),
    static: path.join(__dirname, 'static'),
    components: path.join(__dirname, 'components'),
    nodeModules: path.join(__dirname, 'node_modules/')
};

module.exports = {
    entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: 'build.js'
    },
    resolve: {
        root: [
            PATHS.src
        ],
        fallback: [PATHS.nodeModules],
        alias: {
            'static': PATHS.static,
            'components': PATHS.components
        }
    },
    devtool: 'source-map',
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
        }, {
            test: /\.(sass|scss)$/,
            loaders: ['style', 'css?minimize&autoprefixer=1', 'sass']
        }]
    },
    vue: {
        loaders: {
            sass: 'style!css!sass?indentedSyntax',
            scss: 'style!css!sass',
            css: 'style!css!sass'
        }
    },
    sassLoader: {
        includePaths: [PATHS.scss]
    },
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
};
