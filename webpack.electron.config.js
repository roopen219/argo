const CopyPlugin = require('copy-webpack-plugin')

const PATHS = require('./webpack.paths')

module.exports = {
    entry: PATHS.electronMain,
    context: PATHS.src,
    output: {
        path: PATHS.build,
        filename: 'electron.js',
        libraryTarget: 'commonjs'
    },
    externals: {
        electron: true
    },
    resolve: {
        root: [
            PATHS.src
        ],
        alias: {
            'utils': PATHS.utils,
            'services': PATHS.services
        }
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    target: 'node',
    node: {
        __dirname: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        setImmediate: false
    },
    plugins: [
        new CopyPlugin([
            {
                from: 'electron.package.json',
                to: 'package.json'
            },
            {
                from: 'index.html'
            }
        ], {
            copyUnmodified: true
        })
    ]
}
