import Vue from 'vue'
import store from './store'
import pollux from './pollux'

registerArcComponents()
initializeApp()

function initializeApp() {

    var app = new Vue({
        el: '#app-mount',
        store,
        render: (h) => h('argo-app')
    })
    window.argoApp = app
    window.pollux = pollux

}

function registerArcComponents() {
    var components = require.context('components', true, /\.vue$/)
    components.keys().forEach(function (componentName) {
        var component = components(componentName)
        Vue.component(component.name, component)
    })
}
