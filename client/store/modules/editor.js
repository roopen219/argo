import Vue from 'vue'
import * as types from '../types'
import rand from 'random-key'

class BaseElement {
    constructor (tagName) {
        this.tagName = tagName
        this.children = {}
        this.childrenOrder = []
        this.class = []
        this.style = []
    }

    addChild (childElement, key) {
        if(!(childElement instanceof BaseElement)) {
            throw Error('pass an instance of BaseElement')
        }

        if(this.childrenOrder.indexOf(key) !== -1) {
            throw Error(`child with key ${key} already present`)
        }

        Vue.set(this.children, key, childElement)
        this.childrenOrder.push(key)
    }

    removeChild (key) {
        Vue.delete(this.children, key)
        this.childrenOrder.splice(this.childrenOrder.indexOf(key), 1)
    }
}

let state = {}

let mutations = {

    [types.EDITOR_ADD_PROTOTYPE] (state, prototype) {

        let hashOfElements = getHashOfElements(prototype.dom)

        Vue.set(state, prototype.id, {
            currentSelection: [],
            hashOfElements
        })

    },

    [types.EDITOR_CLOSE_PROTOTYPE] (state, prototypeId) {
        Vue.delete(state, prototypeId)
    },

    [types.APPEND_ELEMENT] (state, {prototypeId, key, element, parentKey}) {

        let prototype = state[prototypeId]
        let parent = prototype.hashOfElements[parentKey].element

        Vue.set(parent.children, key, element)
        parent.childrenOrder.push(key)

        Vue.set(prototype.hashOfElements, key, {
            parent,
            element
        })

    },

    [types.SELECT_ELEMENT] (state, {prototypeId, elementKey}) {
        state[prototypeId].currentSelection = [elementKey]
    }
}

let actions = {

    [types.CREATE_ELEMENT] ({state, commit}, {prototypeId, element}) {

        let currentSelection = state[prototypeId].currentSelection

        commit(types.APPEND_ELEMENT, {
            prototypeId: prototypeId,
            element,
            key: rand.generate(8),
            parentKey: currentSelection.length === 1 ? currentSelection[0] : 'root'
        })

    }

}

function getHashOfElements (dom) {

    let hashOfElements = {
        'root': {
            element: dom.root
        }
    }

    function walker(parent) {

        parent.props.childrenOrder.forEach((childKey) => {

            let child = parent.props.children[childKey]

            hashOfElements[childKey] = {
                parent: parent,
                element: child
            }

            if(child.props.childrenOrder.length) {
                walker(child)
            }

        })

    }

    walker(dom.root)

    return hashOfElements

}

let editor = {
    state,
    mutations,
    actions
}

export default editor
