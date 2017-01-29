/*global Promise*/

import test from 'ava'
import Gemini from '../Gemini'

test.beforeEach(t => {
    t.context.gemini = new Gemini()
})

test('register a service and call a method', t => {

    t.context.gemini.use('user', {
        find(params) {
            return new Promise(resolve => resolve(params))
        }
    })

    return t.context.gemini.service('user')
        .find({
            _id: 1
        })
        .then((result) => t.deepEqual(result, {
            _id: 1
        }))

})
