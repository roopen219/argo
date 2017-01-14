/*global Promise*/

import test from 'ava'
import io from 'socket.io'
import ioClient from 'socket.io-client'
import Castor from '../Castor'

let socketio = io()

test.beforeEach(t => {
    t.context.castor = new Castor(socketio)
    t.context.socketClient = ioClient('http://localhost:3000')
})

test('register a service and call a method internally', t => {

    t.context.castor.use('user', {
        find: (params) => {
            return new Promise(resolve => resolve(params))
        }
    })

    return t.context.castor.service('user')
        .find({
            _id: 1
        })
        .then((result) => t.deepEqual(result, {
            _id: 1
        }))
})

test('single before hook executes in internal service calls', t => {
    t.context.castor.use('user', {
        find: (params) => {
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

    return t.context.castor.service('user')
        .find({
            _id: 1
        })
        .then((result) => {
            t.deepEqual({
                _id: 1,
                addedInBeforeHook: true,
                client: undefined
            }, result)
        })
})

test('single after hook executes in internal service calls', t => {
    t.context.castor.use('user', {
        find: (params) => {
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

    return t.context.castor.service('user')
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

    t.context.castor.use('user', {
        find: (params) => {
            return Promise.resolve(params)
        },
        hooks: {
            before: {
                find: [hookOne, hookTwo]
            }
        }
    })

    return t.context.castor.service('user')
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

    t.context.castor.use('user', {
        find: (params) => {
            return Promise.resolve(params)
        },
        hooks: {
            after: {
                find: [hookOne, hookTwo]
            }
        }
    })

    return t.context.castor.service('user')
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

test('create service call emits a create event', t => {
    let userData = {
        name: 'John Doe'
    }

    t.context.castor.use('user', {
        create: (params) => {
            return Promise.resolve({
                _id: 1,
                data: params.data
            })
        }
    })

    let deffered = new Promise((resolve, reject) => {
        t.context.castor.service('user').on('created', (user) => {
            resolve(user)
        })
    })

    deffered.then((user) => {
        t.deepEqual(userData, user.data)
    })

    t.context.castor.service('user')
        .create({
            data: Object.assign({}, userData)
        })

    return deffered
})
