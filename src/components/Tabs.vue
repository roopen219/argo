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
	    font-size: 15px;
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
	<div class="tabs-container flex-row">
		<div class="tab active" @click="log">
			<span>First Ta</span>
			<button class="close">&times;</button>
		</div>
		<div class="tab">
			<span>Second Tab</span>
			<button class="close">&times;</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'raml-tabs',
		methods: {
			log: function(e) {
				console.log(e)
			}
		}
	}
</script>
