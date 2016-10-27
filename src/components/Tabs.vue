<style scoped lang="scss">
	@import "variables";

	.tabs-container {
		background: $bg-title-bar;
		padding: 5px 20px 0 80px;
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
	    border: none;
	    font-size: 24px;
	    line-height: 1;
	    color: #fafafa;
	    text-shadow: 0 0 4px rgba(0,0,0,0.8);
	    margin-left: 4px;
	}
</style>

<template>
	<div class="tabs-container flex-row">
		<raml-tab :id="tabId" v-for="tabId in tabOrder" :active="tabId === currentTab.id"></raml-tab>
		<button class="btn-open-new-tab" @click="openTab">+</button>
	</div>
</template>

<script>
	import rand from 'random-key'
	import * as types from '../store/types'
	import {mapState} from 'vuex'
	
	export default {
		name: 'raml-tabs',
		computed: mapState({
		    tabs: state => state.tabs.tabs,
			tabOrder: state => state.tabs.tabOrder,
			currentTab: state => state.tabs.currentTab
		}),
		methods: {
			openTab: function () {
				this.$store.dispatch(types.OPEN_TAB, {id: rand.generate()})
			}
		}
	}
</script>
