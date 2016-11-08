import * as types from '../types'
import {RamlEntity} from 'utils'

class Prototype extends RamlEntity {
    constructor (options) {
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

export default {
    state
}
