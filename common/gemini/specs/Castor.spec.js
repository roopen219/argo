/*global Promise*/

import test from 'ava'
import io from 'socket.io'
import ioClient from 'socket.io-client'
import Castor from '../Castor'

test.beforeEach(t => {
    t.context.socketio = io()
    t.context.castor = new Castor(t.context.socketio)
    t.context.port = Math.floor(3000 + (Math.random() * 10000) % 10000)
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

test('errors thrown are propogated to client when methods are called externally', t => {
    let findParams = {
        service: 'user',
        params: {
            _id: 1,
            name: 'John Doe'
        }
    }

    t.context.castor.use('user', {
        find(params) {
            return Promise.reject(new Error('error occured'))
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
        t.is(err, 'error occured')
    })
})

test('authetication should throw error when comparePassword method is not defined on user service', t => {
    let loginData = {
        username: 'john',
        password: 'pass'
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

        t.context.socketClient.emit('login', loginData, (result) => resolve(result))
    }).catch((err) => {
        t.is(err, 'An error occured while logging in')
    })
})

test('should login successfully', t => {
    let loginData = {
        username: 'john',
        password: 'pass'
    }

    t.context.castor.use('user', {
        find(params) {
            return Promise.resolve(params)
        },
        comparePassword(password) {
            return Promise.resolve(true)
        }
    })

    return new Promise((resolve, reject) => {
        let timeout = setTimeout(() => reject('timeout'), 2000)

        t.context.socketClient.on('_error', (err) => {
            clearTimeout(timeout)
            reject(err)
        })

        t.context.socketClient.emit('login', loginData, (result) => resolve(result))
    }).then((result) => {
        t.deepEqual(result, {
            username: 'john'
        })
    })
})

test('user should be available on the client object after login', t => {
    let loginData = {
        username: 'john',
        password: 'pass'
    }

    let findParams = {
        service: 'user',
        params: {}
    }

    t.context.castor.use('user', {
        find(params) {
            return Promise.resolve(params)
        },
        comparePassword(password) {
            return Promise.resolve(true)
        },
        hooks: {
            before: {
                find: function (hook) {
                    if (hook.client.user) {
                        hook.params = hook.client.user
                    }
                }
            }
        }
    })

    return new Promise((resolve, reject) => {
        let timeout = setTimeout(() => reject('timeout'), 2000)

        t.context.socketClient.on('_error', (err) => {
            clearTimeout(timeout)
            reject(err)
        })

        t.context.socketClient.emit('login', loginData, (user) => {
            t.context.socketClient.emit('find', findParams, (result) => {
                resolve(result)
            })
        })
    }).then((result) => {
        t.deepEqual(result, {
            username: 'john'
        })
    })
})

test('client gets notified about updates from a service', t => {
    let loginData = {
        username: 'john',
        password: 'pass',
        _id: '1'
    }

    let createParams = {
        service: 'message',
        params: {
            content: 'blah blah blah',
            to: '1'
        }
    }

    t.context.castor.use('user', {
        find(params) {
            return Promise.resolve(loginData)
        },
        comparePassword(password) {
            return Promise.resolve(true)
        }
    })

    t.context.castor.use('message', {
        create(params) {
            return Promise.resolve(params)
        },
        notifyTo: 'to'
    })

    return new Promise((resolve, reject) => {
        let timeout = setTimeout(() => reject('timeout'), 2000)

        t.context.socketClient.on('_error', (err) => {
            clearTimeout(timeout)
            reject(err)
        })

        t.context.socketClient.on('create', (data) => {
            clearTimeout(timeout)
            resolve(data)
        })

        t.context.socketClient.emit('login', loginData, (user) => {
            t.context.socketClient.emit('create', createParams, () => {})
        })
    }).then((result) => {
        t.deepEqual(result, {
            service: createParams.service,
            data: createParams.params
        })
    })
})
