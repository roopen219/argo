import uuid from 'node-uuid'
import Vue from 'vue'
import randomName from 'adj-noun'
import rand from 'random-key'
import Fuse from 'fuse.js'

import * as types from '../types'
import pollux from '../../pollux'

let state = {}

let mutations = {

    [types.ADD_PROTOTYPE] (state, prototype) {

        if (Array.isArray(prototype)) {

            prototype.forEach((proto) => {
                Vue.set(state, proto.id, proto)
            })

        } else {
            Vue.set(state, prototype.id, prototype)
        }

    },

    [types.REMOVE_PROTOTYPE] (state, prototypeId) {

        Vue.delete(state, prototypeId)

    }

}

let actions = {

    [types.CREATE_PROTOTYPE] ({commit, state}, options = {}) {

        let prototypeService = pollux.service('prototype')

        randomName.seed(Math.floor(Math.random() * 1000000))

        let prototypeName = options.prototypeName || randomName().join(' ')

        let prototype = {
            entityName: 'prototype',
            id: uuid.v4(),
            name: prototypeName,
            dom: {
                root: {
                    children: {
                        a: {
                            tagName: 'h1',
                            textContent: randomName().join(' '),
                            children: {},
                            childrenOrder: [],
                            'class': ['header']
                        },
                        b: {
                            tagName: 'p',
                            textContent: randomName().join(' '),
                            children: {},
                            childrenOrder: []
                        },
                        c: {
                            tagName: 'argo-page-view',
                            children: {
                                z: {
                                    tagName: 'argo-page-content',
                                    props: {
                                        pageKey: 'z'
                                    },
                                    children: {
                                        u: {
                                            tagName: 'input',
                                            attrs: {
                                                type: 'text',
                                                value: randomName().join(' ')
                                            },
                                            'class': ['big-input']
                                        }
                                    },
                                    childrenOrder: ['u']
                                },
                                t: {
                                    tagName: 'argo-page-content',
                                    props: {
                                        pageKey: 't'
                                    },
                                    children: {
                                        v: {
                                            tagName: 'input',
                                            attrs: {
                                                type: 'text',
                                                value: randomName().join(' ')
                                            },
                                            style: {
                                                paddingTop: '20px'
                                            },
                                            'class': ['big-input']
                                        }
                                    },
                                    childrenOrder: ['v']
                                }
                            },
                            childrenOrder: ['z', 't'],
                            props: {
                                defaultActivePage: 'z'
                            }
                        }
                    },
                    childrenOrder: ['a', 'b', 'c']
                }
            },
            sharedStyles: {
                header: {
                    fontSize: '24px',
                    color: '#666',
                    marginBottom: '20px'
                },
                'big-input': {
                    padding: '8px'
                }
            }
        }

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
    }

}

let getters = {
    listOfPrototypes: () => {
        return prototypeArray()
    },

    getPrototype: state => prototypeId => {
        return state[prototypeId]
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
