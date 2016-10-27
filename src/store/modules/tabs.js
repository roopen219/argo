import Vue from 'vue'
import {RamlEntity} from 'utils'

import appService from 'services/appService'
import * as types from '../types'

class Tab extends RamlEntity {
    constructor (tabContent) {
        super('tab')
        this.tabContent = tabContent
    }
}

let state = {
    tabs: {},
    tabOrder: [],
    currentTab: null
}

let mutations = {
    [types.OPEN_TAB] (state, tab) {
        Vue.set(state.tabs, tab.id, tab)
        state.tabOrder.push(tab.id)
    },
    [types.SWITCH_TAB] (state, tabId) {
        state.currentTab = state.tabs[tabId]
    },
    [types.CLOSE_TAB] (state, tabId) {
        Vue.delete(state.tabs, tabId)
        state.tabOrder.splice(state.tabOrder.indexOf(tabId), 1)
    }
}

let actions = {
    [types.OPEN_TAB] ({commit, state}, tabContent) {
        let alreadyOpenedTab = getTabByContentId(tabContent.id)

        if (alreadyOpenedTab) {
            commit(types.SWITCH_TAB, alreadyOpenedTab.id)
        } else {
            let newTab = new Tab(tabContent)
            commit(types.OPEN_TAB, newTab)
            commit(types.SWITCH_TAB, newTab.id)
        }
    },
    [types.SWITCH_TAB] ({commit}, tabId) {
        commit(types.SWITCH_TAB, tabId)
    },
    [types.CLOSE_TAB] ({commit, state}, tabId) {
        let [tabOrder, currentTab] = [state.tabOrder, state.currentTab]
        let isOnlyTabOpen = tabOrder.length === 1
        let isCurrentTab = currentTab.id === tabId

        if (isOnlyTabOpen) {
            commit(types.CLOSE_TAB, tabId)
            appService.quitApp()
        }

        if (isCurrentTab) {
            let tabToSwitch = getTabToSwitch(tabId)

            if (tabToSwitch) {
                commit(types.SWITCH_TAB, tabToSwitch.id)
                commit(types.CLOSE_TAB, tabId)
            }
        }
    }
}

function getTabByContentId (tabContentId) {
    return state.tabs[
        state.tabOrder.find((tabId) => {
            return state.tabs[tabId].tabContent.id === tabContentId
        })
    ]
}

function getTabToSwitch (tabId) {
    let [tabs, tabOrder] = [state.tabs, state.tabOrder]
    let currentTabIndex = tabOrder.indexOf(tabId)

    if (currentTabIndex === -1) {
        return
    }

    if(currentTabIndex === (tabOrder.length - 1)) {
        return tabs[tabOrder[currentTabIndex - 1]]
    }

    return tabs[tabOrder[currentTabIndex + 1]]
}

export default {
    state,
    mutations,
    actions
}
