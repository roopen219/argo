import Vue from 'vue'
import _ from 'lodash'

import ArgoEntityFactory from './ArgoEntityFactory'

export default ArgoEntityFactory('element', {
    properties: {
        componentName: {
            type: 'string',
            default: 'argo-dom-container'
        },
        parent: {
            type: ['string', 'null'],
            default: null
        },
        children: {
            type: 'array',
            default: []
        },
        class: {
            type: 'array',
            default: []
        },
        style: {
            type: 'object',
            default: {}
        },
        attrs: {
            type: 'object',
            default: {}
        },
        textContent: {
            type: 'string',
            default: ''
        }
    },
    methods: {

        addChild(child) {

            let children = this.children

            if (children.indexOf(child) !== -1) {
                throw Error(`child with key ${child} already present`)
            }

            children.push(child)

        },

        removeChild(child) {
            this.children.splice(this.children.indexOf(child), 1)
        },

        addClass(className) {

            if (!className) {
                throw Error('pass a class')
            } else if (Array.isArray(className)) {
                this.class = this.class.concat(className)
            } else {
                this.class.push(className)
            }

        }
    }
})
