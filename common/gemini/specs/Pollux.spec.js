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
    t.context.pollux.use('article', articleServiceParameters)

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
