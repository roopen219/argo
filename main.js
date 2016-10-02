var Vue = require('vue');
var Mousetrap = require('mousetrap');

registerArcComponents();
initializeApp();

window.arcDOM = [{
    type: 'arc-p',
    children: [{
        type: 'arc-text',
        text: 'Hello there!'
    }]
}, {
    type: 'arc-div',
    children: [{
        type: 'arc-button',
        children: [{
            type: 'arc-text',
            text: 'Click me!'
        }]
    }]
}, {
    type: 'arc-input',
    attrs: {
        type: 'text'
    }
}];

Mousetrap.bind('4', function() {
    console.log(4);
});

function initializeApp() {
    var app = new Vue({
        el: '#app-mount',
        data: {
            dom: window.arcDOM
        },
        render: function(h) {
            return h('arc-app');
        }
    });
    window.arcApp = app;
}

function registerArcComponents() {
    var components = require.context('components', true, /\.vue$/);

    components.keys().forEach(function(componentName) {
        var component = components(componentName);
        Vue.component(component.name, component);
    });
}
