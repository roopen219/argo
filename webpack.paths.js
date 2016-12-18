const path = require('path');

module.exports = {
    app: path.join(__dirname, 'client/app.js'),
    build: path.join(__dirname, 'build/'),
    src: path.join(__dirname, 'client/'),
    scss: path.join(__dirname, 'client/static/scss/'),
    static: path.join(__dirname, 'client/static/'),
    utils: path.join(__dirname, 'client/utils/'),
    components: path.join(__dirname, 'client/components/'),
    services: path.join(__dirname, 'client/services'),
    nodeModules: path.join(__dirname, 'node_modules/'),
    electronMain: path.join(__dirname, 'client/electron.js')
};
