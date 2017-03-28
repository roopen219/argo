import uuid from 'node-uuid'
import Vue from 'vue'
import randomName from 'adj-noun'
import Fuse from 'fuse.js'

import * as types from '../types'
import pollux from '../../pollux'

let state = {}

let fuseOptions = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        'name'
    ]
}

let fuse = new Fuse(prototypeArray(), fuseOptions)

let mutations = {

    [types.ADD_PROTOTYPE] (state, prototype) {

        if (Array.isArray(prototype)) {
            prototype.forEach((proto) => {
                Vue.set(state, proto.id, proto)
            })
        } else {
            Vue.set(state, prototype.id, prototype)
        }

        updateFuseList()

    },

    [types.REMOVE_PROTOTYPE] (state, prototypeId) {

        Vue.delete(state, prototypeId)

        updateFuseList()

    }

}

let actions = {

    [types.CREATE_PROTOTYPE] ({commit, state, dispatch}, options = {}) {

        let prototypeService = pollux.service('prototype')

        randomName.seed(Math.floor(Math.random() * 1000000))

        let prototypeName = options.prototypeName || randomName().join(' ')

        let prototype = {
            id: uuid.v4(),
            name: prototypeName,
            dom: {
                root: {
                    children: [{
                        tagName: 'h1',
                        textContent: randomName().join(' '),
                        'class': ['header']
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
                                        'class': ['big-input'],
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
                                        'class': ['big-input'],
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
    listOfPrototypes: state => filter => {
        if (!filter || filter === '' || filter.length > fuseOptions.maxPatternLength) {
            return fuse.list
        }
        return fuse.search(filter)
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

function updateFuseList () {
    fuse.list = prototypeArray()
}

export default PrototypeModule
