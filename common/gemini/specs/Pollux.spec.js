/*global Promise*/

import test from 'ava'
import Pollux from '../Pollux'

test.beforeEach(t => {
    t.context.pollux = new Pollux()
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
