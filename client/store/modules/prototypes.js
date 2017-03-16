/* global Promise */

import uuid from 'node-uuid'
import Vue from 'vue'

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

    [types.CREATE_PROTOTYPE] ({commit}, {options}) {

        let prototype = {
            id: uuid.v4(),
            name: 'The Next Big Thing',
            dom: {
                root: {
                    children: [{
                        tagName: 'h1',
                        textContent: 'Hello There',
                        classes: ['header']
                    }, {
                        tagName: 'p',
                        textContent: 'How are you?'
                    }, {
                        tagName: 'argo-screen-view',
                        views: {
                            'default': {
                                root: {
                                    children: [{
                                        tagName: 'input',
                                        type: 'text',
                                        classes: ['big-input'],
                                        value: 'Already filled in'
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
                                        value: 'KABOOOM'
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

        return Promise.resolve(commit(types.OPEN_PROTOTYPE, prototype))

    },

    [types.SAVE_PROTOTYPE] ({state}, prototypeId) {

        let prototypeService = pollux.service('prototype')

        return prototypeService.create({
            data: state[prototypeId]
        })

    },

    [types.CLOSE_PROTOTYPE] ({commit, state}, prototypeId) {
        return Promise.resolve(commit(types.CLOSE_PROTOTYPE, prototypeId))
    },

    [types.OPEN_PROTOTYPE] ({commit}, prototype) {
        return Promise.resolve(commit(types.OPEN_PROTOTYPE, prototype))
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
