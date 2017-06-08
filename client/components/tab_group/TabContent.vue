<template>
    <div :class="tabViewClass">
        <component  :is="tabViewComponent"
                    :tabContent="tabContent"
                    :tabIndex="tabIndex">
        </component>
    </div>
</template>

<script>
    import {MixinClassFactory} from '../../utils'

    export default {
        name: 'argo-tab-content',
        mixins: [MixinClassFactory(['tabViewClass'])],
        props: {
            tabViewComponent: {
                type: String,
                required: true
            },
            tabContent: {
                type: Object,
                default: {}
            },
            tabIndex: {
                type: Number,
                required: true
            }
        }
    }
</script>
