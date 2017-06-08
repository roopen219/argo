import Vue from 'vue'
import _ from 'lodash'

import * as types from '../types'

import Tab from '../entities/Tab'
import TabGroup from '../entities/TabGroup'

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
    },

    [types.UPDATE_TAB_CONTENT] (state, {tabGroupId, tabIndex, tabContent}) {
        let oldTabContent = state[tabGroupId].tabs[tabIndex].tabContent
        state[tabGroupId].tabs[tabIndex].tabContent = _.merge({}, oldTabContent, tabContent)
    },

    [types.REPLACE_TAB_CONTENT] (state, {tabGroupId, tabIndex, tabContent}) {
        state[tabGroupId].replaceTab(tabIndex, tabContent)
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

    [types.ADD_TAB_GROUP] ({commit}, {tabGroupId, tabs}) {
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
    },

    [types.REPLACE_TAB_CONTENT] ({commit}, {tabGroupId, tabIndex, tabContent, tabViewComponent}) {
        let tabContentToStore = new Tab({tabContent, tabViewComponent})

        commit(types.REPLACE_TAB_CONTENT, {
            tabGroupId,
            tabIndex,
            tabContent: tabContentToStore
        })
    }

}

let getters = {

    getActiveTabIndex: state => tabGroupId => {

        if (state[tabGroupId]) {
            return state[tabGroupId].activeTabIndex
        }

        return 0
    },

    getTabIndexByContentId: state => (tabGroupId, contentId) => {
        return state[tabGroupId].tabs.findIndex((tab) => tab.tabContent.id === contentId)
    }

}

function getTabIndexToSwitch(tabIndex, numberOfTabs) {

    let isOnlyTab = numberOfTabs === 1
    let isLastTabInOrder = tabIndex === (numberOfTabs - 1)

    if (isOnlyTab) {
        return null
    }

    if (isLastTabInOrder) {
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
