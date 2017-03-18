<style lang="scss" scoped>
    @import "variables";

    .tab-content {
        background: $bg-tab-active;
        box-shadow: inset 0 1px 0 #fff;
    }
</style>

<template>
    <div class="tab-content flex-grow-1 flex-column">
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
            }
        }
    }
</script>
