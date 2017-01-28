import _ from 'lodash'
import debug from 'debug'

import Gemini from './Gemini'

let log = debug('castor')

class Castor extends Gemini {

    constructor(socketIOInstance) {

        super()

        let _this = this
        let socketIOListen = socketIOInstance.listen.bind(socketIOInstance)

        this.whichGemini = 'castor'
        this._socketio = socketIOInstance
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

        socketIOInstance.listen = function (port) {
            _this.setup()
            socketIOListen(port)
        }

    }

    configure(configurationName, configuration) {

        _.extend(this._configuration[configurationName], configuration)
        return this

    }

    use(serviceName, serviceParameters) {

        super.use(serviceName, serviceParameters)
        this._setupNotificationsForServiceMethods(serviceName)
        return this

    }

    _setupNotificationsForServiceMethods(serviceName) {

        this._methodsWhichNotifyClient.forEach((method) => {

            let service = this._services[serviceName]

            service.on(method, (result) => {
                this._socketio.to(result[service.notifyTo]).emit(method, {
                    service: serviceName,
                    data: result
                })
            })

        })
    }

    setup() {

        this._socketio.on('connection', (client) => {

            this._methods.forEach((method) => {

                client.on(method, (data, responseCallback) => {

                    let responseCallbackNotPresent = !responseCallback
                    let dataNotSane = !data || !_.isObjectLike(data)
                    let serviceNameNotPresent = !dataNotSane && !data.service

                    if (responseCallbackNotPresent) {

                        client.emit('_error', 'pass in an acknowledgement callback')

                    } else if (dataNotSane) {

                        client.emit('_error', 'provide proper service params')

                    } else if (serviceNameNotPresent) {

                        client.emit('_error', 'provide the service name in the params')

                    } else if (this._services[data.service]) {

                        let service = this._services[data.service]

                        service[method](data.params, client)
                            .then(responseCallback)
                            .catch((err) => {
                                client.emit('_error', err.message)
                            })

                    } else {

                        client.emit('_error', 'service not defined')

                    }

                })

            })

            client.on(this._configuration.authentication.events.login, (data, responseCallback) => {

                let userService = this._services[this._configuration.authentication.userService]

                userService
                    .find({
                        username: data.username
                    })
                    .then((user) => {

                        if (!_.isFunction(userService.comparePassword)) {
                            throw new Error('comparePassword not implemented in the user service')
                        }

                        return userService.comparePassword(user.password, data.password)
                            .then((isSame) => {

                                let userEntity = this._configuration.authentication.userEntity
                                client[userEntity] = user

                                userService.on('update', (data) => {
                                    if (userEntity.id === data.id) {
                                        this._services[this._configuration.authentication.userService]
                                            .find({
                                                username: client[userEntity].username
                                            })
                                            .then((user) => {
                                                client[userEntity] = user
                                            })
                                    }
                                })

                                return client[userEntity]
                            })
                            .then((user) => {

                                client.join(user[this._configuration.authentication.channel])
                                responseCallback(user)

                            })
                    })
                    .catch((error) => {

                        log(error.message)
                        client.emit('_error', 'An error occured while logging in')

                    })

            })

            client.on(this._configuration.authentication.events.logout, (data, responseCallback) => {

                delete client[this._configuration.authentication.userEntity]
                responseCallback('logged out successfully')

            })

        })

    }
}

export default Castor
