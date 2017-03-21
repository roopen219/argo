<template>
    <div :class="this.classes" @click="clickTab">
        <span>{{this.tabContent.name}}</span>
        <button :class="tabCloseButtonClass" @click="closeTab">&times;</button>
    </div>
</template>

<script>
    export default {
        name: 'argo-tab',
        computed: {
        	classes: function () {
        		if (this.isActive)
        		    return [this.tabClass, this.activeTabClass]
                return this.tabClass
        	}
        },
        props: {
            tabContent: {
                type: Object
            },
            onTabClick: {
                type: Function,
                required: true
            },
            onTabClose: {
                type: Function
            },
            isActive: {
                type: Boolean,
                default: false
            },
            index: {
                type: Number,
                required: true
            },
            activeTabClass: {
                type: [Object, String],
                default: function () { return {} }
            },
            tabClass: {
                type: [Object, String],
                default: function () { return {} }
            },
            tabCloseButtonClass: {
                type: [Object, String],
                default: function () { return {} }
            }
        },
        methods: {
        	closeTab: function (e) {
        		e.stopPropagation()
				this.onTabClose(this.index)
        	},
        	clickTab: function () {
				this.onTabClick(this.index)
        	}
        }
    }
</script>
