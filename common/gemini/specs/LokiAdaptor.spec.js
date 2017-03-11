/*global Promise*/

import _ from 'lodash'
import test from 'ava'
import Loki from 'lokijs'

import LokiAdaptor from '../LokiAdaptor'
import Pollux from '../Pollux'
import SERVICE_METHODS from '../geminiMethods'

test.beforeEach((t) => {

    t.context.pollux = new Pollux()
    t.context.loki = new Loki('test.json')

    t.context.lokiAdaptor = LokiAdaptor(t.context.loki)

})

test('creates a new collection called "prototype"', t => {

    t.context.lokiAdaptor({
        collectionName: 'prototype'
    })

    t.is(t.context.loki.collections[0].name, 'prototype')
})

test('exposes the underlying loki collection as collection', t => {

    let prototypeService = t.context.lokiAdaptor({
        collectionName: 'prototype'
    })

    t.is(prototypeService.collection instanceof Loki.Collection, true)
    t.is(prototypeService.collection.name, 'prototype')

})

test('passing no collection name throws an error', t => {

    t.plan(1)

    try {
        t.context.lokiAdaptor({})
    } catch (e) {
        t.is(e.message, 'LokiAdaptor: pass a collectionName')
    }

})

test('creates a collection with specified options', t => {

    t.context.lokiAdaptor({
        collectionName: 'prototype',
        collectionOptions: {
            unique: ['id']
        }
    })

    t.is(t.context.loki.collections[0].name, 'prototype')
    t.is(t.context.loki.collections[0].uniqueNames[0], 'id')

})

test('returns a service object containing relevant service methods', t => {

    let prototypeService = t.context.lokiAdaptor({
        collectionName: 'prototype'
    })

    SERVICE_METHODS.forEach((serviceMethod) => {
        t.is(_.isFunction(prototypeService[serviceMethod.name]), true)
    })
})

test('hooks provided in the options are added to the returned service object', t => {

    let hookText = 'before find hook'
    let prototypeService = t.context.lokiAdaptor({
        collectionName: 'prototype',
        hooks: {
            before: {
                find: function () {
                    return hookText
                }
            }
        }
    })

    t.is(prototypeService.hooks.before.find(), hookText)
})

