const path = require('path');

module.exports = {
    app: path.join(__dirname, 'main.js'),
    build: path.join(__dirname, 'build/'),
    src: path.join(__dirname, '.'),
    scss: path.join(__dirname, 'static/scss/'),
    static: path.join(__dirname, 'static'),
    components: path.join(__dirname, 'components'),
    nodeModules: path.join(__dirname, 'node_modules/'),
    electron: path.join(__dirname, 'electron')
};
