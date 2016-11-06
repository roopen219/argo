/* global process */

const path = require('path')
const is = require('electron-is')

const appService = require('services/appService')

const {
    app,
    BrowserWindow,
    protocol
} = require('electron')

var mainWindow = null

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

protocol.registerStandardSchemes(['ramiel'])

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden-inset',
        frame: false
    })

    if(is.windows()) {
        mainWindow.setMenu(null)
    }

    if (is.dev()) {
        mainWindow.loadURL('http://localhost:8080/index.html')
        mainWindow.webContents.openDevTools()
    } else {
        protocol.registerFileProtocol('ramiel', (request, callback) => {
            const url = request.url.substr(13)
            console.log(url)
            console.log(path.resolve(`${__dirname}/${url}`))

            if (url.length) {
                callback(path.resolve(`${__dirname}/${url}`))
            } else {
                callback(path.resolve(`${__dirname}/index.html`))
            }
        })
        mainWindow.loadURL('ramiel://app')
    }

    mainWindow.maximize()

    mainWindow.on('closed', function() {
        mainWindow = null
    })
})
