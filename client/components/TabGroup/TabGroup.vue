<template>
    <div :class="wrapperClass">
        <div :class="tabRowClass">
            <component  :is="tabComponent"
                        v-for="(tab, index) in tabs"
                        :key="tab.id"
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
        <argo-tab-content   v-for="(tab, index) in tabs"
                            :key="tab.id"
                            v-show="isActiveTab(index)"
                            :tabIndex="index"
                            :tabViewClass="tabViewClass"
                            :tabViewComponent="tab.tabViewComponent"
                            :tabContent="tab.tabContent">
        </argo-tab-content>
    </div>
</template>

<script>
    import {MixinClassFactory} from '../../utils'

    export default {
        name: 'argo-tab-group',
        mixins: [
            MixinClassFactory([
                'wrapperClass',
                'tabRowClass',
                'newTabButtonClass',
                'activeTabClass',
                'tabClass',
                'tabViewClass',
                'tabCloseButtonClass'
            ])
        ],
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
            }
        },
        methods: {
            isActiveTab: function (tabIndex) {
                return tabIndex === this.activeTab
            }
        }
    }
</script>
