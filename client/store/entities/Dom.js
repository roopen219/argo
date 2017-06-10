import Vue from 'vue'
import _ from 'lodash'

import ArgoEntity from './ArgoEntity'
import Element from './Element'

class Dom extends ArgoEntity {

    constructor(initData = {}) {

        super('dom', initData.id)

        this.schema = {
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
                default: () => {return {}}
            }
        }

        this.deserialize(initData)

    }

    createElement(elementOptions, parentId) {

        let element = new Element(elementOptions)

        Vue.set(this.elements, element.id, element)

        this.elements[parentId].addChild(element.id)

    }

}

export default Dom
