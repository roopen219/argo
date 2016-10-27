<style>
    @import "variables";
    
    .tab {
		cursor: pointer;
		padding: 10px 20px 7px 15px;
    	margin-right: 5px;
    	position: relative;
    	min-width: 200px;
    	z-index: 0;
    	color: #444;
    	text-shadow: 0 1px #fff;
    	line-height: 1;

		&.active {
			z-index: 1;

			&:before {
				background: $bg-tab-active;
			}
		}

		&:hover:not(.active) {
			&:before {
				background: $bg-tab-hover;
			}
		}

		&:before {
			content: '';
			position: absolute;
		    left: 0;
		    top: 0;
		    right: 0;
		    bottom: 0;
			background: $bg-tab;
		    transform: perspective(60px) rotateX(10deg);
		    border: 1px solid $color-tabs-border;
			border-bottom: none;
			z-index: -1;
			box-shadow: inset 0 1px 0 #fff, 0 -3px 4px rgba(0,0,0,0.2);
			transition: all 0.2s ease-in;
		}

	}

	.close {
		padding: 0;
	    border: none;
	    border-radius: 100%;
	    line-height: 1;
	    width: 16px;
	    height: 16px;
	    font-size: 14px;
	    position: absolute;
    	right: 10px;
    	top: 9px;

		background: transparent;
		color: $color-close-btn-default;

		transition: all 0.2s ease-in;

    	&:hover {
    		font-size: 14px;
	    	background: $bg-close-btn-hover;
		    color: $color-close-btn-hover;
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
        	closeTab: function (e) {
        		e.stopPropagation()
        		this.$store.dispatch(types.CLOSE_TAB, this.id)
        	},
        	switchTab: function () {
        		this.$store.dispatch(types.SWITCH_TAB, this.id)
        	}
        },
        props: ['id', 'active']
    }
</script>