/*global Promise*/

import test from 'ava'
import Loki from 'lokijs'
import LokiAdaptor from '../LokiAdaptor'
import Pollux from '../Pollux'
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
