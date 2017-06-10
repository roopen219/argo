import Vue from 'vue'

import * as types from '../types'
import pollux from '../../pollux'
import Prototype from '../entities/Prototype'

let state = {}

let mutations = {

    [types.ADD_PROTOTYPE] (state, prototype) {

        if (Array.isArray(prototype)) {

            prototype.forEach((_prototype) => {
                Vue.set(state, _prototype.id, new Prototype(_prototype))
            })

        } else {
            Vue.set(state, prototype.id, new Prototype(prototype))
        }

    },

    [types.REMOVE_PROTOTYPE] (state, prototypeId) {

        Vue.delete(state, prototypeId)

    },

    [types.OPEN_PROTOTYPE] (state, prototypeId) {
        // state[prototypeId].hydrateDomTree()
    },

    [types.SELECT_ELEMENT] (state, {prototypeId, elementId}) {
        state[prototypeId].editorState.currentSelection = [elementId]
    },

    [types.APPEND_ELEMENT] (state, {prototypeId, elementOptions, parentId}) {

        let prototype = state[prototypeId]

        prototype.dom.createElement(elementOptions, parentId)

    }

}

let actions = {

    [types.CREATE_PROTOTYPE] ({commit, state}, options = {}) {

        let prototypeService = pollux.service('prototype')

        let prototype = new Prototype()

        return prototypeService.create({
            data: prototype
        })
        .then((prototype) => {
            commit(types.ADD_PROTOTYPE, prototype)
            return state[prototype.id]
        })
    },

    [types.SAVE_PROTOTYPE] ({state}, prototypeId) {

        let prototypeService = pollux.service('prototype')

        return prototypeService.update({
            id: prototypeId,
            data: state[prototypeId]
        })

    },

    [types.DELETE_PROTOTYPE] ({commit}, prototypeId) {

        let prototypeService = pollux.service('prototype')

        return prototypeService.remove({
            id: prototypeId
        })
        .then((prototype) => {

            commit(types.REMOVE_PROTOTYPE, prototypeId)
            return prototype

        })

    },

    [types.FETCH_PROTOTYPES] ({commit}, prototypeId) {

        let prototypeService = pollux.service('prototype')

        return prototypeService.find({})
            .then((prototypes) => {

                commit(types.ADD_PROTOTYPE, prototypes)
                return prototypes

            })
    },

    [types.OPEN_PROTOTYPE] ({commit, dispatch}, {prototype, replaceTab = false, tabIndex}) {

        let tabGroupId = 'app'
        let tabContent = prototype
        let tabViewComponent = 'argo-prototype-editor'

        if (replaceTab) {

            dispatch(types.REPLACE_TAB_CONTENT, {
                tabGroupId,
                tabIndex,
                tabContent,
                tabViewComponent
            })

        } else {

            dispatch(types.ADD_TAB, {
                tabGroupId,
                tabContent,
                tabViewComponent
            })

        }

        commit(types.OPEN_PROTOTYPE, prototype.id)
    },

    [types.CREATE_ELEMENT] ({state, commit}, {prototypeId, elementOptions}) {

        let currentSelection = state[prototypeId].editorState.currentSelection
        let parentId = currentSelection.length === 1 ? currentSelection[0] : 'root'

        commit(types.APPEND_ELEMENT, {
            prototypeId,
            elementOptions,
            parentId
        })

    }

}

let getters = {
    listOfPrototypes: () => {
        return prototypeArray()
    },

    getPrototype: state => prototypeId => {
        return state[prototypeId]
    },

    getElements: state => prototypeId => {
        return state[prototypeId].dom.elements
    }
}

let PrototypeModule = {
    state,
    mutations,
    actions,
    getters
}

function prototypeArray () {
    return Object.keys(state).map((key) => {
        return state[key]
    })
}

export default PrototypeModule
