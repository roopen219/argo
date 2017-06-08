<template>
    <div :class="this.classes" @click="clickTab">
        <span>{{this.tabContent.name}}</span>
        <button :class="tabCloseButtonClass" @click="closeTab">&times;</button>
    </div>
</template>

<script>
    import {MixinClassFactory} from '../../utils'

    export default {
        name: 'argo-tab',
        computed: {
            classes: function () {

                if (this.isActive) {
                    return [this.tabClass, this.activeTabClass]
                }

                return this.tabClass

            }
        },
        mixins: [
            MixinClassFactory([
                'activeTabClass',
                'tabClass',
                'tabCloseButtonClass'
            ])
        ],
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
