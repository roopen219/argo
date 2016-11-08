import Vue from 'vue'
import store from './store'
import prototype from 'services/prototypeService'

registerArcComponents()
initializeApp()

window.prototypeService = prototype()

function initializeApp() {
    var app = new Vue({
        el: '#app-mount',
        store,
        render: (h) => h('raml-app')
    })
    window.ramlApp = app
}

function registerArcComponents() {
    var components = require.context('components', true, /\.vue$/)
    components.keys().forEach(function(componentName) {
        var component = components(componentName)
        Vue.component(component.name, component)
    })
}
