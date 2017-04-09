<template>
    <div><slot></slot></div>
</template>
<script>
    export default {
        name: 'argo-page-view',
        props: ['defaultActivePage'],
        mounted: function() {
            window.x = this.$el
            console.log(this.$el)
        }
    }
</script>
