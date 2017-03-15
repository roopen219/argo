import Vue from 'vue'

import * as types from '../types'

class Tab {

    constructor({tabContent, tabViewComponent}) {
        this.tabContent = tabContent
        this.tabViewComponent = tabViewComponent
    }

}

class TabGroup {

    constructor(tabs = []) {

        this.tabs = tabs
        this.activeTabIndex = 0

    }

    addTab(tab) {

        this.tabs.push(tab)
        return this

    }

    removeTab(index) {
        return this.tabs.splice(index, 1)
    }

    setActiveTabIndex(index) {
        this.activeTabIndex = index
    }

    getTabIndexByContentId(id) {
        return this.tabs.findIndex((tab) => tab.tabContent.id === id)
    }

}

let state = {}

let mutations = {

    [types.ADD_TAB] (state, {tabGroupId, tabContent}) {
        state[tabGroupId].addTab(tabContent)
    },

    [types.SWITCH_TAB] (state, {tabGroupId, tabIndex}) {
        state[tabGroupId].setActiveTabIndex(tabIndex)
    },

    [types.REMOVE_TAB] (state, {tabGroupId, tabIndex}) {
        let tabGroup = state[tabGroupId]
        let activeTabIndex = tabGroup.activeTabIndex

        tabGroup.removeTab(tabIndex)

        if(activeTabIndex > tabIndex) {
            tabGroup.setActiveTabIndex(activeTabIndex - 1)
        }
    },

    [types.ADD_TAB_GROUP] (state, {tabGroupId, tabGroup}) {
        Vue.set(state, tabGroupId, tabGroup)
    },

    [types.REMOVE_TAB_GROUP] (state, tabGroupId) {
        Vue.delete(state, tabGroupId)
    }

}

let actions = {

    [types.ADD_TAB] ({commit, state}, {tabGroupId, tabContent, tabViewComponent, switchToTab = true}) {

        let tabContentToStore = new Tab({tabContent, tabViewComponent})

        commit(types.ADD_TAB, {
            tabGroupId,
            tabContent: tabContentToStore
        })

        if (switchToTab) {
            commit(types.SWITCH_TAB, {
                tabGroupId,
                tabIndex: state[tabGroupId].tabs.length - 1
            })
        }

    },

    [types.SWITCH_TAB] ({commit}, {tabGroupId, tabIndex}) {
        commit(types.SWITCH_TAB, {
            tabGroupId,
            tabIndex
        })
    },

    [types.REMOVE_TAB] ({commit, state}, {tabGroupId, tabIndex}) {

        let activeTabIndex = state[tabGroupId].activeTabIndex
        let isActiveTab = activeTabIndex === tabIndex
        let numberOfTabs = state[tabGroupId].tabs.length

        if (isActiveTab) {

            let tabToSwitch = getTabIndexToSwitch(tabIndex, numberOfTabs)

            if (tabToSwitch !== null) {

                commit(types.SWITCH_TAB, {
                    tabGroupId,
                    tabIndex: tabToSwitch
                })

            }

        }

        commit(types.REMOVE_TAB, {
            tabGroupId,
            tabIndex
        })

    },

    [types.ADD_TAB_GROUP] ({commit, state}, {tabGroupId, tabs}) {
        let multipleTabsProvided = Array.isArray(tabs)

        if (multipleTabsProvided) {
            if (tabs.length !== 0) {
                tabs = tabs.map((tab) => new Tab(tab))
            }
        } else if (!tabs) {
            tabs = []
        } else {
            tabs = [new Tab(tabs)]
        }

        let tabGroup = new TabGroup(tabs)

        commit(types.ADD_TAB_GROUP, {tabGroupId, tabGroup})

    },

    [types.REMOVE_TAB_GROUP] ({commit, state}, {tabGroupId}) {
        if (state[tabGroupId]) {
            commit(types.REMOVE_TAB_GROUP, tabGroupId)
        }
    }

}

let getters = {

    getActiveTabIndex: state => tabGroupId => {

        if (state[tabGroupId]) {
            return state[tabGroupId].activeTabIndex
        }

        return 0
    }

}

function getTabIndexToSwitch(tabIndex, numberOfTabs) {

    // if it is the only tab remaining
    if (numberOfTabs === 1) {
        return null
    }

    // if it is the last tab
    if (tabIndex === (numberOfTabs - 1)) {
        return tabIndex - 1
    }

    return tabIndex + 1
}

let TabModule = {
    state,
    mutations,
    actions,
    getters
}

export default TabModule
