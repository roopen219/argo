import Vue from 'vue'
import _ from 'lodash'

import ArgoEntityFactory from './ArgoEntityFactory'
import Element from './Element'

let schema = {
    elements: {
        type: 'object',
        default: () => {
            return {
                root: new Element()
            }
        },
        deserialize: function (elements) {
            return _.mapValues(elements, (element) => new Element(element))
        }
    },
    sharedStyles: {
        type: 'object',
        default: () => {
            return {}
        }
    }
}

let methods = {

    createElement(elementOptions, parentId) {

        let element = new Element(elementOptions)

        Vue.set(this.elements, element.id, element)

        this.elements[parentId].addChild(element.id)

    }

}

let Dom = ArgoEntityFactory('dom', schema, methods)

export default Dom
