import Vue from 'vue'

import * as types from '../types'
import pollux from '../../pollux'
import Prototype from '../entities/Prototype'

import _ from 'lodash'

let state = {
    all: {},
    openedForEditing: {}
}

let mutations = {

    [types.ADD_PROTOTYPE] (state, prototype) {

        if (Array.isArray(prototype)) {

            prototype.forEach((_prototype) => {
                Vue.set(state.all, _prototype.id, _prototype)
            })

        } else {
            Vue.set(state.all, prototype.id, prototype)
        }

    },

    [types.REMOVE_PROTOTYPE] (state, prototypeId) {

        Vue.delete(state.all, prototypeId)

    },

    [types.OPEN_PROTOTYPE] (state, prototype) {
        Vue.set(state.openedForEditing, prototype.id, new Prototype(prototype))
    },

    [types.CLOSE_PROTOTYPE] (state, prototypeId) {
        Vue.delete(state.openedForEditing, prototypeId)
    },

    [types.SELECT_ELEMENT] (state, {prototypeId, elementId}) {
        state.openedForEditing[prototypeId].editorState.currentSelection = [elementId]
    },

    [types.APPEND_ELEMENT] (state, {prototypeId, elementOptions, parentId}) {

        let prototype = state.openedForEditing[prototypeId]

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
            return state.all[prototype.id]
        })
    },

    [types.SAVE_PROTOTYPE] ({commit, state}, prototypeId) {

        let prototypeService = pollux.service('prototype')

        prototypeService.update({
            id: prototypeId,
            data: state.openedForEditing[prototypeId]
        }).then((updatedPrototype) => {
            commit(types.ADD_PROTOTYPE, updatedPrototype)
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

        commit(types.OPEN_PROTOTYPE, prototype)

        let tabGroupId = 'app'
        let tabContent = state.openedForEditing[prototype.id]
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

    },

    [types.CREATE_ELEMENT] ({state, commit}, {prototypeId, elementOptions}) {

        let currentSelection = state.openedForEditing[prototypeId].editorState.currentSelection
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
        return state.all[prototypeId]
    },

    listOfOpenPrototypes: () => {
        return openedPrototypeArray()
    },

    getOpenedPrototype: state => prototypeId => {
        return state.openedForEditing[prototypeId]
    },

    getElements: state => prototypeId => {
        return state.openedForEditing[prototypeId].dom.elements
    }
}

let PrototypeModule = {
    state,
    mutations,
    actions,
    getters
}

function prototypeArray () {
    return Object.keys(state.all).map((key) => {
        return state.all[key]
    })
}

function openedPrototypeArray () {
    return Object.keys(state.openedForEditing).map((key) => {
        return state.openedForEditing[key]
    })
}

export default PrototypeModule
