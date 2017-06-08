import Vue from 'vue'

import ArgoEntity from './ArgoEntity'

class TabGroup extends ArgoEntity {

    constructor(tabs = []) {

        super('tabGroup')

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

    replaceTab(index, newTab) {
        return Vue.set(this.tabs, index, newTab)
    }

    setActiveTabIndex(index) {
        this.activeTabIndex = index
    }

}

export default TabGroup
