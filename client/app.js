/* global Promise*/

import Vue from 'vue'
import Loki from 'lokijs'
import LokiIndexedAdaptor from 'lokijs/src/loki-indexed-adapter'

import store from './store'
import pollux from './pollux'
import LokiAdaptor from '../common/gemini/LokiAdaptor'

registerArgoComponents()

initializeDb()
    .then(initializeLokiAdaptor)
    .then(initializeServices)
    .then(initializeApp)

function initializeApp () {

    var app = new Vue({
        el: '#app-mount',
        store,
        render: (h) => h('argo-app')
    })
    window.argoApp = app

}

function initializeDb () {

    return new Promise((resolve, reject) => {

        let idbAdaptor = new LokiIndexedAdaptor()
        let lokiDb = new Loki('argo.db', {
            adapter: idbAdaptor,
            autoload: true,
            autoloadCallback: autoLoadHandler,
            autosave: true,
            env: 'BROWSER'
        })

        window.loki = lokiDb

        function autoLoadHandler () {
            resolve(lokiDb)
        }
    })

}

function initializeLokiAdaptor (lokiDb) {

    let lokiAdaptor = LokiAdaptor(lokiDb)
    return Promise.resolve(lokiAdaptor)

}

function initializeServices (lokiAdaptor) {

    pollux.use('prototype', lokiAdaptor({
        collectionName: 'prototype',
        collectionOptions: {
            unique: ['id']
        }
    }))

    return Promise.resolve(true)

}

function registerArgoComponents() {
    var components = require.context('components', true, /\.vue$/)
    components.keys().forEach(function (componentName) {
        var component = components(componentName)
        component && component.name && Vue.component(component.name, component)
    })
}
