/* global process */

const path = require('path')
const is = require('electron-is')
const io = require('socket.io-client')
const feathers = require('feathers')
const hooks = require('feathers-hooks')
const socketio = require('feathers-socketio/client')

const appService = require('services/appService')
const prototypeService = require('services/prototypeService')

const {
    app,
    BrowserWindow,
    protocol,
    globalShortcut
} = require('electron')

var mainWindow = null

const socket = io('http://localhost:8081')

const feathersApp = feathers()
    .configure(hooks())
    .configure(socketio(socket))

feathersApp.use('prototype', prototypeService(feathersApp))

feathersApp.service('prototype-server').create({'blah': 'blah'})

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
        globalShortcut.register('Control+R', () => {
            mainWindow.reload()
        })
    }

    if (is.dev()) {
        mainWindow.loadURL('http://localhost:8080/index.html')
        mainWindow.webContents.openDevTools()
    } else {
        protocol.registerFileProtocol('ramiel', (request, callback) => {
            const url = request.url.substr(13)

            if (url.length) {
                callback(path.resolve(`${__dirname}/${url}`))
            } else {
                callback(path.resolve(`${__dirname}/index.html`))
            }
        })
        mainWindow.loadURL('ramiel://app')
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
