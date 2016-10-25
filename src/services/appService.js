const is = require('electron-is')
const {ipcMain, ipcRenderer, app} = require('electron')

const {APP_QUIT} = require('./messageTypes')

let appService = {}

if (is.renderer()) {
    appService.quitApp = quitApp
}

if (is.main()) {
    ipcMain.on(APP_QUIT, () => {
        app.quit()
    })
}

function quitApp () {
    ipcRenderer.send(APP_QUIT)
}

module.exports = appService
