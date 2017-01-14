/*global Promise*/

import _ from 'lodash'
import METHODS from './geminiMethods'

class Castor {
    constructor(socketIOInstance) {
        let _this = this
        let socketIOListen = socketIOInstance.listen.bind(socketIOInstance)

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
        let methods = Object.keys(METHODS).map((methodKey) => METHODS[methodKey])

        methods.forEach((method) => {
            service[method] = this._wrapMethod(method, service)
        })

        this._services[serviceName] = service
        return this
    }

    _wrapMethod(method, service) {
        if (service[method]) {
            let originalMethod = service[method].bind(service)

            return (params, client) => {
                let hookObject = {
                    params,
                    client
                }

                if (service.hooks) {
                    return this._executeHooks('before', method, hookObject, service)
                        .then(originalMethod)
                        .then((result) => {
                            return this._executeHooks('after', method, {
                                result
                            }, service)
                        })

                }

                return originalMethod(params)
            }
        }

        return undefined
    }

    _executeHooks(type, method, hookObject, service) {
        let isHookPresent = service.hooks[type] && service.hooks[type][method]

        if (isHookPresent) {
            let hooks = service.hooks[type][method]

            if (_.isArray(hooks)) {
                hooks.reduce((promise, hook) => promise.then(() => hook(hookObject)), Promise.resolve())
            } else {
                hooks(hookObject)
            }

        }

        return Promise.resolve(type === 'before' ? hookObject.params : hookObject.result)
    }

    setup() {
        this._services.keys().forEach((key) => {
            this._services[key].setup(this)
        })

        this._socketio.on('connection', (client) => {
            client.on(this._configuration.authentication.events.login, (data) => {
                this._configuration.authentication.userService
                    .find(data.username)
                    .then((user) => {
                        return user.comparePassword(data.password)
                            .then((isSame) => {
                                client[this._configuration.authentication.userEntity] = user
                            })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            client.on(this._configuration.authentication.events.logout, () => {})
        })
    }
}

export default Castor
