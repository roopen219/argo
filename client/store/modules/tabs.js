import Vue from 'vue'

import {
    ArgoEntity
} from 'utils'

import * as types from '../types'

class Tab extends ArgoEntity {

    constructor(tabContent) {

        super('tab')

        this.tabContent = tabContent

    }
}

class TabGroup extends ArgoEntity {

    constructor(id, tabs = []) {

        super('tab-group')

        this.tabs = tabs
        this.currentTab = tabs.length ? 0 : null

    }

    addTab(tab) {

        this.tabs.push(tab)
        return this

    }

    removeTab(index) {
        return this.tabs.splice(index, 1)
    }

    get currentTab() {
        return this.currentTab
    }

    set currentTab(index) {
        this.currentTab = index
    }

    getTabByContentId(id) {
        return this.tabs.find((tab) => tab.tabContent.id === id)
    }

}

let state = {}

let mutations = {

    [types.ADD_TAB](state, tabGroupId, tab) {
        state[tabGroupId].addTab(tab)
    },

    [types.SWITCH_TAB](state, tabGroupId, tabIndex) {
        state[tabGroupId].currentTab = tabIndex
    },

    [types.REMOVE_TAB](state, tabGroupId, tabIndex) {
        state[tabGroupId].removeTab(tabIndex)
    }

}

let actions = {

    [types.ADD_TAB]({
        commit,
        state
    }, tabContent) {

        let alreadyOpenedTab = getTabByContentId(tabContent.id)

        if (alreadyOpenedTab) {

            commit(types.SWITCH_TAB, alreadyOpenedTab.id)

        } else {

            let newTab = new Tab(tabContent)

            commit(types.ADD_TAB, newTab)
            commit(types.SWITCH_TAB, newTab.id)

        }

    },

    [types.SWITCH_TAB]({
        commit
    }, tabId) {
        commit(types.SWITCH_TAB, tabId)
    },

    [types.REMOVE_TAB]({
        commit,
        state
    }, tabId) {

        let [tabOrder, currentTab] = [state.tabOrder, state.currentTab]
        let isCurrentTab = currentTab.id === tabId

        if (isCurrentTab) {

            let tabToSwitch = getTabToSwitch(tabId)

            if (tabToSwitch) {

                commit(types.SWITCH_TAB, tabToSwitch.id)
                commit(types.REMOVE_TAB, tabId)

            }

            return

        }

        commit(types.REMOVE_TAB, tabId)

    }

}

function getTabToSwitch(tabId) {
    let [tabs, tabOrder] = [state.tabs, state.tabOrder]
    let currentTabIndex = tabOrder.indexOf(tabId)

    if (currentTabIndex === -1) {
        return
    }

    if (currentTabIndex === (tabOrder.length - 1)) {
        return tabs[tabOrder[currentTabIndex - 1]]
    }

    return tabs[tabOrder[currentTabIndex + 1]]
}

let TabModule = {
    state,
    mutations,
    actions
}

export default TabModule
