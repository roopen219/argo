<template>
    <div :class="tabViewClass">
        <component  :is="tabViewComponent"
                    :tabContent="tabContent"
                    :tabIndex="tabIndex">
        </component>
    </div>
</template>

<script>
    export default {
        name: 'argo-tab-content',
        props: {
            tabViewComponent: {
                type: String,
                required: true
            },
            tabContent: {
                type: Object,
                default: {}
            },
            tabViewClass: {
                type: [Object, String],
                default: {}
            },
            tabIndex: {
                type: Number,
                required: true
            }
        }
    }
</script>
