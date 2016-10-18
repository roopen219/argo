const path = require('path');

module.exports = {
    app: path.join(__dirname, 'src/app.js'),
    build: path.join(__dirname, 'build/'),
    src: path.join(__dirname, 'src/'),
    scss: path.join(__dirname, 'src/static/scss/'),
    static: path.join(__dirname, 'src/static/'),
    utils: path.join(__dirname, 'src/utils/'),
    components: path.join(__dirname, 'src/components/'),
    nodeModules: path.join(__dirname, 'node_modules/'),
    electronMain: path.join(__dirname, 'src/electron.js')
};
