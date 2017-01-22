/*global Promise*/

import _ from 'lodash'
import CastorService from './CastorService'
import METHODS from './geminiMethods'
import debug from 'debug'

let log = debug('castor')

class Castor {
    constructor(socketIOInstance) {
        let _this = this
        let socketIOListen = socketIOInstance.listen.bind(socketIOInstance)

        this._methods = Object.keys(METHODS).map((methodKey) => METHODS[methodKey])
        this._socketio = socketIOInstance
        this._services = {}
        this._configuration = {
            authentication: {
                userService: 'user',
                events: {
                    login: 'login',
                    logout: 'logout'
                },
                channel: '_id',
                userEntity: 'user'
            }
        }

        this.whichGemini = 'castor'

        socketIOInstance.listen = function (port) {
            _this.setup()
            socketIOListen(port)
        }
    }

    configure(configurationName, configuration) {
        _.extend(this._configuration[configurationName], configuration)
        return this
    }

    service(serviceName) {
        return this._services[serviceName]
    }

    use(serviceName, service) {
        this._services[serviceName] = new CastorService(service)
        this._services[serviceName].setup(this)
        return this
    }

    setup() {
        this._socketio.on('connection', (client) => {
            this._methods.forEach((method) => {
                client.on(method, (data, ack) => {
                    if (!ack) {
                        client.emit('_error', 'pass in an acknowledgement callback')
                    } else if (!data || !_.isObjectLike(data)) {
                        client.emit('_error', 'provide proper service params')
                    } else if (!data.service) {
                        client.emit('_error', 'provide the service name in the params')
                    } else if (this._services[data.service]) {
                        this._services[data.service][method](data.params, client)
                            .then(ack)
                            .catch((err) => {
                                client.emit('_error', err.message)
                            })
                    } else {
                        client.emit('_error', 'service not defined')
                    }
                })
            })
            client.on(this._configuration.authentication.events.login, (data, ack) => {
                this._services[this._configuration.authentication.userService]
                    .find(data.username)
                    .then((user) => {
                        if (!_.isFunction(user.comparePassword)) {
                            throw new Error('comparePassword not implemented in the user service')
                        }
                        return user.comparePassword(data.password)
                            .then((isSame) => {
                                client[this._configuration.authentication.userEntity] = user
                            })
                    })
                    .catch((error) => {
                        log(error.message)
                        client.emit('_error', 'An error occured while logging in')
                    })
            })
            client.on(this._configuration.authentication.events.logout, (data, ack) => {
                delete client[this._configuration.authentication.userEntity]
                ack('logged out successfully')
            })
        })
    }
}

export default Castor
