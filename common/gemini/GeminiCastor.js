import _ from 'lodash'

class GeminiCastor {
    constructor (socketIOInstance) {
        let _this = this
        let socketIOListen = socketIOInstance.listen.bind(socketIOInstance)

        this._socketio = socketIOInstance
        this._channels = {}
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

    configure (configurationName, configuration) {
        _.extend(this._configuration[configurationName], configuration)
        return this
    }

    service (serviceName) {
        return this._services[serviceName]
    }

    use (serviceName, service) {
        this._services[serviceName] = service
        return this
    }

    setup () {
        this._services.keys().forEach((key) => {
            this._services[key].setup(this)
        })

        this._socketio.on('connection', (client) => {
            client.on(this._configuration.authentication.events.login, (data) => {
                this._configuration.authentication.userService
                    .find(username)
                    .then((user) => {
                        return user.comparePassword(password)
                    })
                    .then((isSame) => {
                        client[this._configuration.authentication.userEntity] = user
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            client.on(this._configuration.authentication.events.logout, () => {})
        })
    }
}

export default GeminiCastor