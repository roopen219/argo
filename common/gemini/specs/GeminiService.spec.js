/*global Promise*/

import test from 'ava'
import GeminiService from '../GeminiService'

test('single before hook executes in internal service calls', t => {
    let userService = new GeminiService('user', {
        find(params) {
            return new Promise(resolve => {
                resolve(params)
            })
        },
        hooks: {
            before: {
                find: function (hook) {
                    hook.params.addedInBeforeHook = true
                    hook.params.client = hook.client
                }
            }
        }
    })

    return userService
        .find({
            _id: 1
        })
        .then((result) => {
            t.deepEqual({
                _id: 1,
                addedInBeforeHook: true,
                client: {}
            }, result)
        })
})

test('single after hook executes in internal service calls', t => {
    let userService = new GeminiService('user', {
        find(params) {
            return new Promise(resolve => resolve(params))
        },
        hooks: {
            after: {
                find: (hook) => {
                    hook.result.addedInAfterHook = true
                }
            }
        }
    })

    return userService
        .find({
            _id: 1
        })
        .then((result) => {
            t.deepEqual({
                _id: 1,
                addedInAfterHook: true
            }, result)
        })
})

test('multiple before hooks execute in internal service calls', t => {
    let hookOne = function (hook) {
        hook.params.addedInHook1 = true
    }

    let hookTwo = function (hook) {
        hook.params.addedInHook2 = true
    }

    let userService = new GeminiService('user', {
        find(params) {
            return Promise.resolve(params)
        },
        hooks: {
            before: {
                find: [hookOne, hookTwo]
            }
        }
    })

    return userService
        .find({
            _id: 1
        })
        .then((result) => {
            t.deepEqual({
                _id: 1,
                addedInHook1: true,
                addedInHook2: true
            }, result)
        })
})

test('multiple after hooks execute in internal service calls', t => {
    let hookOne = function (hook) {
        hook.result.addedInHook1 = true
    }

    let hookTwo = function (hook) {
        hook.result.addedInHook2 = true
    }

    let userService = new GeminiService('user', {
        find(params) {
            return Promise.resolve(params)
        },
        hooks: {
            after: {
                find: [hookOne, hookTwo]
            }
        }
    })

    return userService
        .find({
            _id: 1
        })
        .then((result) => {
            t.deepEqual({
                _id: 1,
                addedInHook1: true,
                addedInHook2: true
            }, result)
        })
})

test('throw an error when non implemented methods are called internally', t => {
    let userService = new GeminiService('user', {})

    return userService
        .find()
        .catch((reason) => {
            t.is(reason.message, 'find not implemented on this service')
        })
})

test('create service call emits a create event', t => {
    let userData = {
        name: 'John Doe'
    }

    let userService = new GeminiService('user', {
        create(params) {
            return Promise.resolve({
                _id: 1,
                data: params.data
            })
        }
    })

    let deffered = new Promise((resolve, reject) => {
        userService.on('create', (user) => {
            resolve(user)
        })
    })

    deffered.then((user) => {
        t.deepEqual(userData, user.data)
    })

    userService
        .create({
            data: Object.assign({}, userData)
        })

    return deffered
})

test('define custom properties on a service and access them internally', t => {
    let userService = new GeminiService('user', {
        customMethod: function (testParam) {
            return Promise.resolve(testParam + this.customProperty)
        },
        customProperty: 'test'
    })

    return userService
        .customMethod('hello ')
        .then((result) => {
            t.is('hello test', result)
        })
})

test('"this" should be the service in methods', t => {
    let userService = new GeminiService('user', {
        find(params) {
            return Promise.resolve(this.name)
        }
    })

    return userService
        .find({})
        .then((result) => {
            t.is('user', result)
        })
})

test('"this" should be the service in hooks', t => {
    let beforeHook = function (hook) {
        hook.params.serviceName = this.name
    }

    let userService = new GeminiService('user', {
        find(params) {
            return Promise.resolve(params)
        },
        hooks: {
            before: {
                find: [beforeHook]
            }
        }
    })

    return userService
        .find({})
        .then((result) => {
            t.deepEqual({
                serviceName: 'user'
            }, result)
        })
})
