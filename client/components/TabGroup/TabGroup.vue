<style scoped lang="scss">
	@import "variables";

	.tabs-container {
		background: $bg-title-bar;
		border-bottom: 1px solid #aaa;
    	box-shadow: inset 0 -2px 4px rgba(0,0,0,0.2);
	}

	.btn-open-new-tab {
		background: none;
	    border: 1px solid transparent;
		border-bottom: none;
	    font-size: 24px;
	    line-height: 1;
	    color: #fafafa;
	    text-shadow: 0 0 4px rgba(0,0,0,0.8);
		padding: 2px 10px;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;

		&:hover {
			background: $bg-tab;
			border-color: #aaa;
			color: #444;
			box-shadow: inset 0 1px 0 #fff,
			0 -3px 4px rgba(0, 0, 0, .2);
			text-shadow: 0 1px rgba(255, 255, 255, 0.5);
		}
	}
</style>

<template>
    <div :class="wrapperClass">
        <div :class="tabContainerClasses">
            <component  :is="tabComponent"
                        v-for="(tab, index) in tabs"
                        :index="index"
                        :tabContent="tab.tabContent"
                        :isActive="isActiveTab(index)"
                        :onTabClick="switchTab"
                        :onTabClose="closeTab">
            </component>
            <button class="btn-open-new-tab" @click="openTab">+</button>
        </div>
        <argo-tab-content   v-if="tabs[activeTab]"
                            :tabViewComponent="tabs[activeTab].tabViewComponent"
                            :tabContent="tabs[activeTab].tabContent">
        </argo-tab-content>
    </div>
</template>

<script>
	export default {
		name: 'argo-tab-group',
        computed: {
            tabContainerClasses: function () {
                return "tabs-container flex-row " + this.tabContainerClass
            }
        },
        props: {
            tabComponent: {
                type: String,
                default: 'argo-tab'
            },
            tabs: {
                type: Array,
                default: []
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
                type: String,
                default: ''
            },
            tabContainerClass: {
                type: String,
                default: ''
            }
        },
		methods: {
            isActiveTab: function (tabIndex) {
                return tabIndex === this.activeTab
            }
		}
	}
</script>
