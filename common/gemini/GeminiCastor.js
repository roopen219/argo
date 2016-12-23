class GeminiCastor {
    constructor (socketIOInstance) {
        let _this = this
        let socketIOListen = socketIOInstance.listen.bind(socketIOInstance)

        this.socketio = socketIOInstance
        this.clients = []
        this.whichGemini = 'castor'

        socketIOInstance.listen = function (port) {
            _this.setup()
            socketIOListen(port)
        }
    }

    service (serviceName) {

    }

    use (serviceName, serviceHandler) {

    }

    setup () {

    }
}

export default GeminiCastor