import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

let storeModules = requireStoreModules()

export default new Vuex.Store({
    actions,
    getters,
    modules: storeModules
})

function requireStoreModules() {
    let storeModules = require.context('./modules', false, /\.js$/)

    return storeModules
        .keys()
        .map((filePath) => {
            let lastIndexOf = filePath.lastIndexOf
            var fileName = filePath.substr(lastIndexOf('/') + 1, lastIndexOf('.'))

            return {
                [fileName]: storeModules(filePath)
            }
        })
        .reduce((module1, module2) => {
            return Object.assign({}, module1, module2)
        })
}
