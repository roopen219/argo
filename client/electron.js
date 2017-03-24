/* global process */

const path = require('path')
const is = require('electron-is')

const appService = require('services/appService')

const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')

const {
    app,
    BrowserWindow,
    protocol,
    globalShortcut
} = require('electron')

var mainWindow = null

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

protocol.registerStandardSchemes(['argo'])

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
        // titleBarStyle: 'hidden-inset',
        // frame: true
    })

    if(is.windows()) {
        mainWindow.setMenu(null)
        globalShortcut.register('Control+R', () => {
            mainWindow.reload()
        })
    }

    if (is.dev()) {
        installExtension(VUEJS_DEVTOOLS)
            .then((name) => {
                mainWindow.loadURL('http://localhost:8080/index.html')
                mainWindow.webContents.openDevTools()
            })
            .catch((err) => console.log('An error occurred: ', err))
    } else {
        protocol.registerFileProtocol('argo', (request, callback) => {
            const url = request.url.substr(13)

            if (url.length) {
                callback(path.resolve(`${__dirname}/${url}`))
            } else {
                callback(path.resolve(`${__dirname}/index.html`))
            }
        })
        mainWindow.loadURL('argo://app')
    }

    mainWindow.maximize()

    globalShortcut.register('Control+Shift+R', () => {
        app.relaunch()
        app.quit()
    })

    mainWindow.on('closed', function() {
        mainWindow = null
    })
})
