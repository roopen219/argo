import Vue from 'vue'

import ArgoEntity from './ArgoEntity'
import Element from './Element'

class Dom extends ArgoEntity {

    constructor(dom = {}) {

        super('dom', dom.id)

        this.elements = dom.elements || {}
        this.sharedStyles = dom.sharedStyles || {}

    }

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
    }

    createElement(elementOptions, parentId) {

        let element = new Element(elementOptions)

        Vue.set(this.elements, element.id, element)

        this.elements[parentId].addChild(element.id)

    }

}

export default Dom
