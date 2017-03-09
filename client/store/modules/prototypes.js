import * as types from '../types'
import {
    ArgoEntity
} from 'utils'

class Prototype extends ArgoEntity {
    constructor(options) {
        super('prototype')
    }
}

let state = {
    prototypes: []
}

let mutations = {

}

let actions = {
    [types.CREATE_PROTOTYPE]: (options) => {

    }
}

let PrototypeModule = {
    state,
    mutations,
    actions
}

export default PrototypeModule
