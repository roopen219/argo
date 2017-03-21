<template>
    <div :class="tabViewClass">
        <keep-alive>
            <component  :is="tabViewComponent"
                        :tabContent="tabContent">
            </component>
        </keep-alive>
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
            }
        }
    }
</script>
