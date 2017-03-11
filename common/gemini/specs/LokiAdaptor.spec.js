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
