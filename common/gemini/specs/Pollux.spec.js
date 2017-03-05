/*global Promise*/

import test from 'ava'
import io from 'socket.io'
import ioClient from 'socket.io-client'

import Pollux from '../Pollux'
import Castor from '../Castor'

test.beforeEach(t => {
    t.context.pollux = new Pollux()
    t.context.socketIOServer = io()
    t.context.castor = new Castor(t.context.socketIOServer)
    t.context.port = Math.floor(3000 + (Math.random() * 10000) % 10000)
    t.context.socketIOServer.listen(t.context.port)
    t.context.socketIOClient = ioClient('http://localhost:' + t.context.port)

    t.context.loginData = {
        name: 'JohnDoe',
        password: 'password123'
    }

    t.context.castor.use('user', {
        data: {
            _id: 1,
            ...t.context.loginData
        },
        find(params) {
            if (params.name === this.data.name) {
                return Promise.resolve(this.data)
            }
            return Promise.reject('No such user exists!')
        },
        comparePassword(password) {
            if (password === this.data.password) {
                return Promise.resolve(true)
            }
            return Promise.reject('Password doesn\'t match!')
        }
    })
})

test('register a service and call a method', t => {
    let articleServiceParameters = {
        find(params) {
            return Promise.resolve(params)
        }
    }

    let findParams = {
        _id: 1
    }

    t.context.pollux.use('article', articleServiceParameters)

    return t.context.pollux.service('article')
        .find(findParams)
        .then((result) => {
            t.deepEqual(findParams, result)
        })
})

test('should login successfully', t => {

    let userServiceParameters = {
        data: {},
        find(params) {
            if(params.name === this.data.name)
                return Promise.resolve(data)
            return Promise.reject('No such user!')
        },
        create(params) {
            this.data = this.params.data
            return Promise.resolve(this.data._id)
        },
        remoteService: 'user'
    }

    t.context.pollux.use('user', userServiceParameters)

    return new Promise((resolve, reject) => {
        let timeout = setTimeout(() => reject('timeout'), 2000)

        t.context.socketIOClient.on('_error', (err) => {
            clearTimeout(timeout)
            reject(err)
        })

        t.context.pollux.on('loginSuccessful', (ev) => {
            t.pass()
        })

        t.context.pollux.login(t.context.loginData)
    })

})

test.skip('dummy', t => {

    let userServiceParameters = {
        find(params) {
            return Promise.resolve(params)
        }
    }

    let findParams = {
        _id: 1
    }

    t.context.pollux.use('user', userServiceParameters)

    return t.context.pollux.service('user')
        .find(findParams)
        .then((result) => {
            t.deepEqual(findParams, result)
        })

})

test('local service should sync with the remote service', t => {

    let articleServiceParameters = {
        find(params) {
            return Promise.resolve(this.data[params.id])
        },
        data: {}
    }

    let findParams = {
        _id: 1
    }

    t.context.pollux.use('article', articleServiceParameters)

    t.context.pollux.sync('article')
        .then((result) => {
            return t.context.pollux.service('article')
                .find(findParams)
        })
        .then((result) => {
            t.deepEqual({
                _id: 1,
                name: 'Some random name'
            }, result)
        })
})

test.skip('dummy', t => {

    let userServiceParameters = {
        find(params) {
            return Promise.resolve(params)
        },
        remoteService: 'user'
    }

    let articleServiceParameters = {
        find(params) {
            return Promise.resolve(params)
        },
        remoteService: 'article',
        syncParameter: 'accessibleBy'
    }

    t.context.pollux.use('user', userServiceParameters)

    t.context.pollux.login({
        username: 'john',
        password: 'password'
    })

    t.context.pollux.on('loginSuccessful', (ev) => {
        t.context.syncAllServices()
    })

    return new Promise((resolve, reject) => {
        t.context.pollux.on('syncComplete', (ev) => {
            t.context.pollux.service('article')
                .find({
                    _id: 1
                })
                .then(resolve)
        })
    })

})
