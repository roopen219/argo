import * as types from '../types'

let state = {
    tabs: {},
    tabOrder: [],
    currentTab: null
}

let mutations = {
    [types.OPEN_TAB] (state, tab) {
        state.tabs[tab.id] = tab
        state.tabs.push(tab.id)
    },
    [types.SWITCH_TAB] (state, tabId) {
        state.currentTab = state.tabs[tabId]
    },
    [types.CLOSE_TAB] (state, tabId) {
        delete state.tabs[tabId]
        state.splice(state.indexOf(tabId), 1)
    }
}

export default {
    state,
    mutations
}
