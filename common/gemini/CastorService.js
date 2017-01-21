/*global Promise*/

import EventEmitter from 'events'
import _ from 'lodash'
import METHODS from './geminiMethods'

let methods = Object.keys(METHODS).map((methodKey) => METHODS[methodKey])

class CastorService extends EventEmitter {
    constructor(options) {
        super()
        let nonCustomProperties = methods.concat(['hooks'])
        this._methods = _.pick(options, methods)
        this._hooks = _.pick(options.hooks, ['before', 'after'])
        this._setup = options.setup

        Object.keys(options).forEach((option) => {
            if (nonCustomProperties.indexOf(option) === -1) {
                if (_.isFunction(options[option])) {
                    this[option] = options[option].bind(this)
                }
                this[option] = options[option]
            }
        })

        Object.keys(this._methods).forEach((method) => {
            this._methods[method] = this._methods[method].bind(this)
        })

        methods.forEach((method) => {
            this[method] = this._wrapMethod(method)
        })
    }

    setup(geminiApp) {
        if (_.isFunction(this._setup)) {
            this._setup(geminiApp)
        }

        this.app = geminiApp
    }

    _wrapMethod(method) {
        return (params, client) => {
            if (!this._methods[method]) {
                return Promise.reject(new Error(`${method} not implemented on this service`))
            } else {
                let hookObject = {
                    params,
                    client,
                    method
                }

                return this._executeHooks('before', method, hookObject)
                    .then(this._methods[method])
                    .then((result) => {
                        return this._executeHooks('after', method, {
                            result
                        })
                    })
                    .then((result) => {
                        let shouldEmitEvent = (method !== 'find' && method !== 'get')

                        if (shouldEmitEvent) {
                            this.emit(method, result)
                        }

                        return result
                    })
            }
        }
    }

    _executeHooks(type, method, hookObject) {
        let isHookPresent = this._hooks[type] && this._hooks[type][method]

        if (isHookPresent) {
            let hooks = this._hooks[type][method]

            if (_.isArray(hooks)) {
                hooks.reduce((promise, hook) => promise.then(() => hook.call(this, hookObject)), Promise.resolve())
            } else {
                hooks.call(this, hookObject)
            }

        }

        return Promise.resolve(type === 'before' ? hookObject.params : hookObject.result)
    }
}

export default CastorService
