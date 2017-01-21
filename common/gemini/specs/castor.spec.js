/*global Promise*/

import test from 'ava'
import io from 'socket.io'
import ioClient from 'socket.io-client'
import Castor from '../Castor'

test.beforeEach(t => {
    t.context.socketio = io()
    t.context.castor = new Castor(t.context.socketio)
    t.context.port = Math.floor(3000 + (Math.random() * 1000) % 1000)
    t.context.socketio.listen(t.context.port)
    t.context.socketClient = ioClient('http://localhost:' + t.context.port)
})

test('register a service and call a method internally', t => {

    t.context.castor.use('user', {
        find(params) {
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
        find(params) {
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
        find(params) {
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

test('throw an error when non implemented methods are called internally', t => {
    t.context.castor.use('user', {})

    return t.context.castor.service('user')
        .find()
        .catch((reason) => {
            t.is(reason.message, 'find not implemented on this service')
        })
})

test('create service call emits a create event', t => {
    let userData = {
        name: 'John Doe'
    }

    t.context.castor.use('user', {
        create(params) {
            return Promise.resolve({
                _id: 1,
                data: params.data
            })
        }
    })

    let deffered = new Promise((resolve, reject) => {
        t.context.castor.service('user').on('create', (user) => {
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

test('register a service and call a method externally', t => {
    let findParams = {
        service: 'user',
        params: {
            _id: 1,
            name: 'John Doe'
        }
    }

    t.context.castor.use('user', {
        find(params) {
            return Promise.resolve(params)
        }
    })

    return new Promise((resolve, reject) => {
        let timeout = setTimeout(() => reject('timeout'), 2000)

        t.context.socketClient.emit('find', findParams, (result) => {
            clearTimeout(timeout)
            resolve(result)
        })
    }).then((result) => {
        t.deepEqual(findParams.params, result)
    })
})

test('not passing an acknowledgement callback should emit an error', t => {
    let findParams = {
        service: 'user',
        params: {
            _id: 1,
            name: 'John Doe'
        }
    }

    t.context.castor.use('user', {
        find(params) {
            return Promise.resolve(params)
        }
    })

    return new Promise((resolve, reject) => {
        let timeout = setTimeout(() => reject('timeout'), 2000)

        t.context.socketClient.on('_error', (err) => {
            clearTimeout(timeout)
            reject(err)
        })

        t.context.socketClient.emit('find', findParams)
    }).catch((err) => {
        t.is(err, 'pass in an acknowledgement callback')
    })
})

test('emit an error when non implemented methods are called externally', t => {
    let findParams = {
        service: 'user',
        params: {
            _id: 1,
            name: 'John Doe'
        }
    }

    t.context.castor.use('user', {
        create(params) {
            return Promise.resolve(params)
        }
    })

    return new Promise((resolve, reject) => {
        let timeout = setTimeout(() => reject('timeout'), 2000)

        t.context.socketClient.on('_error', (err) => {
            clearTimeout(timeout)
            reject(err)
        })

        t.context.socketClient.emit('find', findParams, (result) => resolve(result))
    }).catch((err) => {
        t.is(err, 'find not implemented on this service')
    })
})

test('emit an error when service name is not provided in params', t => {
    let findParams = {
        params: {
            _id: 1,
            name: 'John Doe'
        }
    }

    t.context.castor.use('user', {
        find(params) {
            return Promise.resolve(params)
        }
    })

    return new Promise((resolve, reject) => {
        let timeout = setTimeout(() => reject('timeout'), 2000)

        t.context.socketClient.on('_error', (err) => {
            clearTimeout(timeout)
            reject(err)
        })

        t.context.socketClient.emit('find', findParams, (result) => resolve(result))
    }).catch((err) => {
        t.is(err, 'provide the service name in the params')
    })
})

test('emit an error when no params are passed', t => {
    t.context.castor.use('user', {
        find(params) {
            return Promise.resolve(params)
        }
    })

    return new Promise((resolve, reject) => {
        let timeout = setTimeout(() => reject('timeout'), 2000)

        t.context.socketClient.on('_error', (err) => {
            clearTimeout(timeout)
            reject(err)
        })

        t.context.socketClient.emit('find', null, (result) => resolve(result))
    }).catch((err) => {
        t.is(err, 'provide proper service params')
    })
})

test('define custom properties on a service and access them internally', t => {
    t.context.castor.use('user', {
        customMethod: function (testParam) {
            return Promise.resolve(testParam + this.customProperty)
        },
        customProperty: 'test'
    })

    return t.context.castor.service('user')
        .customMethod('hello ')
        .then((result) => {
            t.is('hello test', result)
        })
})

test('"this" should be the service in methods', t => {
    t.context.castor.use('user', {
        find(params) {
            return Promise.resolve(this.app.whichGemini)
        }
    })

    return t.context.castor.service('user')
        .find({})
        .then((result) => {
            t.is('castor', result)
        })
})

test('"this" should be the service in hooks', t => {
    let beforeHook = function (hook) {
        hook.params.whichGemini = this.app.whichGemini
    }

    t.context.castor.use('user', {
        find(params) {
            return Promise.resolve(params)
        },
        hooks: {
            before: {
                find: [beforeHook]
            }
        }
    })

    return t.context.castor.service('user')
        .find({})
        .then((result) => {
            t.deepEqual({
                whichGemini: 'castor'
            }, result)
        })
})
