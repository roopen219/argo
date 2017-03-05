<style lang="scss" scoped>
    @import "variables";

    .tab-content {
        background: $bg-tab-active;
        box-shadow: inset 0 1px 0 #fff;
    }
</style>

<template>
    <div class="tab-content flex-grow-1">
    </div>
</template>

<script>
    import * as types from '../store/types'
	import {mapState, mapActions} from 'vuex'

    export default {
        name: 'raml-tab-content',
        computed: {
			...mapState(['tabs'])
		}
    }
</script>
