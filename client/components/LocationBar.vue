<style lang="scss">
    @import "variables";

    .location-bar {
        padding: 8px 20px;
        background: $bg-tab-active;
        border-bottom: 1px solid $color-tabs-border;
        min-height: 48px;
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
