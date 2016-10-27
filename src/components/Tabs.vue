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
</style>

<template>
	<div class="tabs-container flex-row">
		<template v-for="tabId in tabOrder">
			<raml-tab></raml-tab>
		</template>
	</div>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	
	export default {
		name: 'raml-tabs',
		computed: mapState({
		    tabs: state => state.tabs.tabs,
			tabOrder: state => state.tabs.tabOrder,
			currentTab: state => state.tabs.currentTab
		}),
		methods: {
			log: function(e) {
				console.log(this.tabs)
			}
		}
	}
</script>
