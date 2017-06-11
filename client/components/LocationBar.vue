<style lang="scss">
    @import "variables";

    .location-bar {
        padding: 8px 20px;
        background: $bg-tab-active;
        border-bottom: 1px solid $color-tabs-border;
        box-shadow: inset 0 1px 0 #fff, 0 1px 4px rgba(0,0,0,0.15);
        min-height: 48px;
        position: relative;
        z-index: 1;
    }
</style>

<template>
    <div class="location-bar flex-row">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'argo-location-bar'
    }
</script>
