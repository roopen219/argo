import METHODS from './geminiMethods'
import CastorService from './CastorService'

class Gemini {

    constructor() {

        this._services = {}
        this._methods = Object.keys(METHODS).map((methodKey) => METHODS[methodKey].name)
        this._methodsWhichNotifyClient = Object.keys(METHODS).map((methodKey) => {
            if (METHODS[methodKey].notify) {
                return METHODS[methodKey].name
            }
        })

    }

    service(serviceName) {

        return this._services[serviceName]

    }

    use(serviceName, serviceParameters) {

        this._services[serviceName] = new CastorService(serviceName, serviceParameters)
        this._services[serviceName].setup(this)
        return this

    }

}

export default Gemini
