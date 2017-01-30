import EventEmitter from 'events'

import METHODS from './geminiMethods'
import GeminiService from './GeminiService'

class Gemini extends EventEmitter {

    constructor() {

        super()

        this._services = {}
        this._methods = METHODS.map((method) => method.name)
        this._methodsWhichNotifyClient = METHODS.filter((method) => method.notify).map((method) => method.name)

    }

    service(serviceName) {

        return this._services[serviceName]

    }

    use(serviceName, serviceParameters) {

        this._services[serviceName] = new GeminiService(serviceName, serviceParameters)
        this._services[serviceName].setup(this)
        return this

    }

}

export default Gemini
