const is = require('electron-is')
const {ipcMain, ipcRenderer} = require('electron')
const nedbAdapter = require('feathers-nedb')
const Nedb = require('nedb')
const uuid = require('node-uuid')

class RamlService extends nedbAdapter.Service {
    constructor (options) {
        let _this = this
        let nedbOptions = options.nedb || {
            db: './db/' + options.serviceName,
            autoload: true
        }

        options.Model = new Nedb(nedbOptions)

        super(options)

        this.after = {
            create (hook) {
                console.log(this)
                _this.backendService.create(hook.data)
            }
        }

    }

    create (data, params) {
        data._id = uuid.v4()
        return super(data)
    }

    setup (app, path) {
        let _this = this
        this.app = app
        this.path = path
        this.backendService = this.app.service(path + 'server')
        this.backendService.after({
            create (hook) {
                if()
            }
        })
        return super.setup(app, path)
    }
}
