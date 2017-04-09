import * as types from './types'

let actions = {

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

        commit(types.EDITOR_ADD_PROTOTYPE, prototype)
    },

    [types.CLOSE_PROTOTYPE] ({getters, commit}, prototypeId) {
        if(getters.getTabIndexByContentId('app', prototypeId) === -1) {
            commit(types.EDITOR_CLOSE_PROTOTYPE, prototypeId)
        }
    }
}

export default actions
