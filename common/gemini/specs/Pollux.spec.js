/*global Promise*/

import test from 'ava'
import Pollux from '../Pollux'

test.beforeEach(t => {
    t.context.pollux = new Pollux()
})

test('register a service and call a method', t => {

    t.context.pollux.use('user', {
        find(params) {
            return new Promise(resolve => resolve(params))
        }
    })

    return t.context.pollux.service('user')
        .find({
            _id: 1
        })
        .then((result) => t.deepEqual(result, {
            _id: 1
        }))

})
