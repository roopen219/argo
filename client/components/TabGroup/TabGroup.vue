<template>
    <div :class="wrapperClass">
        <div :class="tabRowClass">
            <component  :is="tabComponent"
                        v-for="(tab, index) in tabs"
                        :index="index"
                        :tabContent="tab.tabContent"
                        :isActive="isActiveTab(index)"
                        :tabClass="tabClass"
                        :activeTabClass="activeTabClass"
                        :tabCloseButtonClass="tabCloseButtonClass"
                        :onTabClick="switchTab"
                        :onTabClose="closeTab">
            </component>
            <button :class="newTabButtonClass" @click="openTab">+</button>
        </div>
        <argo-tab-content   v-if="tabs[activeTab]"
                            :tabViewClass="tabViewClass"
                            :tabViewComponent="tabs[activeTab].tabViewComponent"
                            :tabContent="tabs[activeTab].tabContent">
        </argo-tab-content>
    </div>
</template>

<script>
	export default {
		name: 'argo-tab-group',
        props: {
            tabComponent: {
                type: String,
                default: 'argo-tab'
            },
            tabs: {
                type: Array,
                default: function () { return [] }
            },
            activeTab: {
                type: Number,
                default: 0
            },
            switchTab: {
                type: Function,
                required: true
            },
            closeTab: {
                type: Function,
                default: function(){}
            },
            openTab: {
                type: Function,
                default: function(){}
            },
            wrapperClass: {
                type: [Object, String],
                default: function () { return {} }
            },
            tabRowClass: {
                type: [Object, String],
                default: function () { return {} }
            },
            newTabButtonClass: {
                type: [Object, String],
                default: function () { return {} }
            },
            activeTabClass: {
                type: [Object, String],
                default: function () { return {} }
            },
            tabClass: {
                type: [Object, String],
                default: function () { return {} }
            },
            tabViewClass: {
                type: [Object, String],
                default: function () { return {} }
            },
            tabCloseButtonClass: {
                type: [Object, String],
                default: function () { return {} }
            }
        },
		methods: {
            isActiveTab: function (tabIndex) {
                return tabIndex === this.activeTab
            }
		}
	}
</script>
