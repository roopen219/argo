import Vue from 'vue'

import ArgoEntityFactory from './ArgoEntityFactory'

let schema = {
    tabs: {
        type: 'array',
        default: () => []
    },
    activeTabIndex: {
        type: 'number',
        default: 0
    }
}

let methods = {

    addTab(tab) {

        this.tabs.push(tab)
        return this

    },

    removeTab(index) {
        return this.tabs.splice(index, 1)
    },

    replaceTab(index, newTab) {
        return Vue.set(this.tabs, index, newTab)
    },

    setActiveTabIndex(index) {
        this.activeTabIndex = index
    }

}

let TabGroup = ArgoEntityFactory('tabGroup', schema, methods)

export default TabGroup
