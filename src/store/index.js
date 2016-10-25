import Vue from 'vue'
import Vuex from 'vuex'

// import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex)

let storeModules = requireStoreModules()

export default new Vuex.Store({
    // actions,
    // getters,
    modules: storeModules
})

function requireStoreModules() {
    let storeModules = require.context('./modules', false, /\.js$/)

    return storeModules
        .keys()
        .map((filePath) => {
            let fileName = filePath.substr(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.') - 2)

            return {
                [fileName]: storeModules(filePath).default
            }
        })
        .reduce((module1, module2) => Object.assign({}, module1, module2))
}
