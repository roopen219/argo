import Vue from 'vue'

import ArgoEntityFactory from './ArgoEntityFactory'
import Element from './Element'

export default ArgoEntityFactory('dom', {

    properties: {
        elements: {
            type: 'object'
        },
        sharedStyles: {
            type: 'object'
        }
    },

    methods: {

        hydrateElements() {

            let elements = this.elements
            let elementIds = Object.keys(elements)

            let hasElements = elementIds.length

            if (!hasElements) {
                Vue.set(elements, 'root', new Element())
            } else {
                elementIds.forEach((elementId) => {
                    elements[elementId] = new Element(elements[elementId])
                })
            }
        },

        createElement(elementOptions, parentId) {

            let element = new Element(elementOptions)

            Vue.set(this.elements, element.id, element)

            this.elements[parentId].addChild(element.id)

        }
    }
})

