/* global Promise */

import uuid from 'node-uuid'
import Vue from 'vue'
import randomName from 'adj-noun'

import * as types from '../types'
import pollux from '../../pollux'

let state = {}

let mutations = {

    [types.OPEN_PROTOTYPE] (state, prototype) {

        Vue.set(state, prototype.id, prototype)
        return state[prototype.id]

    },

    [types.CLOSE_PROTOTYPE] (state, prototypeId) {

        let prototype = state[prototypeId]

        Vue.delete(state, prototypeId)

        return prototype

    }

}

let actions = {

    [types.CREATE_PROTOTYPE] ({commit, state, dispatch}, options = {}) {

        let prototypeName = options.prototypeName || randomName().join(' ')

        let prototype = {
            id: uuid.v4(),
            name: prototypeName,
            dom: {
                root: {
                    children: [{
                        tagName: 'h1',
                        textContent: randomName().join(' '),
                        classes: ['header']
                    }, {
                        tagName: 'p',
                        textContent: randomName().join(' ')
                    }, {
                        tagName: 'argo-screen-view',
                        views: {
                            'default': {
                                root: {
                                    children: [{
                                        tagName: 'input',
                                        type: 'text',
                                        classes: ['big-input'],
                                        value: randomName().join(' ')
                                    }]
                                }
                            },
                            'anotherscreen': {
                                root: {
                                    children: [{
                                        tagName: 'input',
                                        type: 'text',
                                        style: {
                                            padding: {
                                                top: '20px'
                                            }
                                        },
                                        classes: ['big-input'],
                                        value: randomName().join(' ')
                                    }]
                                }
                            }
                        }
                    }]
                }
            },
            sharedStyles: {
                header: {
                    fontSize: '24px',
                    color: '#666',
                    margin: {
                        bottom: '20px'
                    }
                },
                bigInput: {
                    padding: {
                        top: '8px',
                        bottom: '8px',
                        left: '8px',
                        right: '8px'
                    }
                }
            }
        }

        commit(types.OPEN_PROTOTYPE, prototype)

        return Promise.resolve(state[prototype.id])

    },

    [types.SAVE_PROTOTYPE] ({state}, prototypeId) {

        let prototypeService = pollux.service('prototype')

        return prototypeService.create({
            data: state[prototypeId]
        })

    },

    [types.CLOSE_PROTOTYPE] ({commit, state}, prototypeId) {

        commit(types.CLOSE_PROTOTYPE, prototypeId)
        return Promise.resolve(true)

    },

    [types.OPEN_PROTOTYPE] ({commit, state}, prototype) {

        commit(types.OPEN_PROTOTYPE, prototype)
        return Promise.resolve(state[prototype.id])

    },

    [types.REMOVE_PROTOTYPE] ({commit}, prototypeId) {

        let prototypeService = pollux.service('prototype')

        return prototypeService.remove({
            id: prototypeId
        })
        .then((prototype) => {

            commit(types.CLOSE_PROTOTYPE, prototypeId)
            return prototype

        })

    }

}

let PrototypeModule = {
    state,
    mutations,
    actions
}

export default PrototypeModule
