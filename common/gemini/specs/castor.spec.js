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
        .find({_id: 1})
        .then((result) => t.deepEqual(result, {_id: 1}))
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
        .find({_id: 1})
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
                    return Promise.resolve(hook)
                }
            }
        }
    })

    return t.context.castor.service('user')
        .find({_id: 1})
        .then((result) => {
            t.deepEqual({
                _id: 1,
                addedInAfterHook: true
            }, result)
        })
})

test('multiple before hooks execute in internal service calls', t => {
    let hook1 = function (hook) {
        hook.params.addedInHook1 = true
        return Promise.resolve(hook)
    }

    let hook2 = function (hook) {
        hook.params.addedInHook2 = true
        return Promise.resolve(hook)
    }

    t.context.castor.use('user', {
        find: (params) => {
            return Promise.resolve(params)
        },
        hooks: {
            before: [hook1, hook2]
        }
    })

    return t.context.castor.service('user')
        .find({_id: 1})
        .then((result) => {
            t.deepEqual({
                _id: 1,
                addedInHook1: true,
                addedInHook2: true
            })
        })
})