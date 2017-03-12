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

    t.context.dataToCreate = {
        id: 1,
        name: 'My first prototype'
    }

})

test('creates a new collection called "prototype"', t => {

    t.context.lokiAdaptor({
        collectionName: 'prototype'
    })

    t.is(t.context.loki.getCollection('prototype').name, 'prototype')

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

test('check create method', t => {

    let data = t.context.dataToCreate

    let prototypeService = t.context.lokiAdaptor({
        collectionName: 'prototype'
    })

    return prototypeService
        .create({data})
        .then((result) => {

            t.is(result.id, data.id)
            t.is(result.name, data.name)

        })
        .catch((error) => {
            t.fail(error.message)
        })

})

test('check find method', t => {

    let data = t.context.dataToCreate

    let prototypeService = t.context.lokiAdaptor({
        collectionName: 'prototype'
    })

    return prototypeService
        .create({data})
        .then((_) => {
            return prototypeService.find({query: {id: data.id}})
        })
        .then((result) => {

            t.is(result[0].id, data.id)
            t.is(result[0].name, data.name)

        })
        .catch((error) => {
            t.fail(error.message)
        })

})

test('check get method', t => {

    let data = t.context.dataToCreate

    let prototypeService = t.context.lokiAdaptor({
        collectionName: 'prototype'
    })

    return prototypeService
        .create({data})
        .then((_) => {
            return prototypeService.get({id: data.id})
        })
        .then((result) => {

            t.is(result.id, data.id)
            t.is(result.name, data.name)

        })
        .catch((error) => {
            t.fail(error.message)
        })

})

test('check update method', t => {

    let data = t.context.dataToCreate
    let dataToUpdate = {
        id: '2',
        name: 'Updated prototype name'
    }

    let prototypeService = t.context.lokiAdaptor({
        collectionName: 'prototype'
    })

    return prototypeService
        .create({data})
        .then((_) => {
            return prototypeService.update({id: data.id, data: dataToUpdate})
        })
        .then((result) => {

            t.is(result.id, data.id)
            t.is(result.name, dataToUpdate.name)

        })
        .catch((error) => {
            t.fail(error.message)
        })

})

test('check remove method', t => {

    let data = t.context.dataToCreate

    let prototypeService = t.context.lokiAdaptor({
        collectionName: 'prototype'
    })

    return prototypeService
        .create({data})
        .then((_) => {
            return prototypeService.remove({id: data.id})
        })
        .then((result) => {

            t.is(result.id, data.id)
            t.is(result.name, data.name)

        })
        .then(() => {
            return prototypeService.get({id: data.id})
        })
        .then((result) => {
            t.is(result, null)
        })
        .catch((error) => {
            t.fail(error.message)
        })

})

