import EventEmitter from 'EventEmitter'
import METHODS from './geminiMethods'

let methods = Object.keys(METHODS).map((methodKey) => METHODS[methodKey])

class CastorService extends EventEmitter {
    constructor (options) {
        
    }

    find (params) {

    }

    get (params) {

    }

    create (params) {

    }

    update (params) {

    }

    patch (params) {

    }

    remove (params) {
        
    }

    setup (geminiApp) {
        
    }
}

export default CastorService