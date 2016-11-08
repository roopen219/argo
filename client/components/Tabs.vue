<style scoped lang="scss">
	@import "variables";

	.tabs-container {
		background: $bg-title-bar;
		padding: 5px 20px 0 80px;
		border-bottom: 1px solid #aaa;
    	box-shadow: inset 0 -2px 4px rgba(0,0,0,0.2);
	}

	.logo {
		font-size: 11px;
		font-weight: bold;
		color: $text-color-light;
		letter-spacing: 3px;
		margin: 3px 15px 0 0;
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
	<div class="tabs-container flex-row">
		<raml-tab :id="tabId" v-for="tabId in tabs.tabOrder" :active="isActiveTab(tabId)"></raml-tab>
		<button class="btn-open-new-tab" @click="openTab">+</button>
	</div>
</template>

<script>
	import rand from 'random-key'
	import * as types from '../store/types'
	import {mapState, mapActions} from 'vuex'

	export default {
		name: 'raml-tabs',
		computed: {
			...mapState(['tabs'])
		},
		methods: {
			...mapActions({
				_openTab: types.OPEN_TAB
			}),
			openTab: function () {
				this._openTab({id: rand.generate()})
			},
            isActiveTab: function (tabId) {
                return tabId === this.tabs.currentTab.id
            }
		}
	}
</script>
