const is = require('electron-is')
const {ipcMain, ipcRenderer} = require('electron')
const feathersNedb = require('feathers-nedb')
const Nedb = require('nedb')

const {CREATE_PROTOTYPE} = require('./messageTypes')

function prototypeService (app) {
    let prototype = {}

    if (is.renderer()) {
        prototype.create = createPrototype
    }

    if (is.main()) {
        const db = new Nedb({
            filename: './db/prototype',
            autoload: true
        })

        prototype = feathersNedb({
            Model: db,
            paginate: {
                default: 2,
                max: 4
            }
        })

        ipcMain.on(CREATE_PROTOTYPE, (event, prototype) => {
            console.log(prototype)
            app.service('prototype').create(prototype)
        })
    }

    function createPrototype (prototype) {
        ipcRenderer.send(CREATE_PROTOTYPE, prototype)
    }

    return prototype
}

module.exports = prototypeService
