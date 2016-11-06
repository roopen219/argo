<style lang="scss">
    @import "variables";

    .tab {
		cursor: pointer;
		padding: 8px 20px 6px 14px;
    	margin-right: 4px;
    	position: relative;
    	min-width: 200px;
    	z-index: 0;
    	color: #444;
    	text-shadow: 0 1px rgba(255, 255, 255, 0.5);
    	line-height: 1;
		border: 1px solid #aaa;
		background: $bg-tab;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		border-bottom: none;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8),
		0 -3px 4px rgba(0, 0, 0, .2), inset 0 -2px 10px rgba(0,0,0,0.1);

		&.active {
			z-index: 1;
			background: $bg-tab-active;
			box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8),
			0 -3px 4px rgba(0, 0, 0, .2);

			&:after {
				content: '';
				position: absolute;
				display: inline-block;
				bottom: -2px;
				left: 0;
				right: 0;
				height: 2px;
				background: $bg-tab-active;
			}
		}

		&:hover:not(.active) {
			background: $bg-tab-hover;
		}
	}

	.close {
		padding: 0;
	    border: none;
	    border-radius: 2px;
	    line-height: 1;
	    width: 16px;
	    height: 16px;
	    font-size: 14px;
	    position: absolute;
    	right: 10px;
    	top: 7px;

		background: transparent;
		color: $color-close-btn-default;

		transition: all 0.2s ease-in;

    	&:hover {
    		font-size: 14px;
	    	background: $bg-close-btn-hover;
		    color: $color-close-btn-hover;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
    	}

    	&:focus, &:active {
			outline: none;
    	}
	}
</style>

<template>
    <div :class="this.classes" @click="switchTab">
        <span>{{this.id}}</span>
        <button class="close" @click="closeTab">&times;</button>
    </div>
</template>

<script>
	import * as types from '../store/types'
	import {mapActions} from 'vuex'

    export default {
        name: 'raml-tab',
        computed: {
        	classes: function () {
        		let classes = {
        			tab: 'tab',
        			active: this.active
        		}
        		return classes
        	}
        },
        methods: {
			...mapActions({
				'_closeTab': types.CLOSE_TAB,
				'_switchTab': types.SWITCH_TAB
			}),
        	closeTab: function (e) {
        		e.stopPropagation()
				this._closeTab(this.id)
        	},
        	switchTab: function () {
				this._switchTab(this.id)
        	}
        },
        props: ['id', 'active']
    }
</script>
