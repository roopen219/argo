const path = require('path');

module.exports = {
    app: path.join(__dirname, 'src/main.js'),
    build: path.join(__dirname, 'build/'),
    src: path.join(__dirname, 'src/'),
    scss: path.join(__dirname, 'src/static/scss/'),
    static: path.join(__dirname, 'src/static/'),
    nodeModules: path.join(__dirname, 'node_modules/')
};
