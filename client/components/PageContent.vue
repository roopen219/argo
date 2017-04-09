<template>
    <div v-if="showPage"><slot></slot></div>
</template>
<script>
    export default {
        name: 'argo-page-content',
        props: ['pageKey'],
        computed: {
            showPage: function() {
                return this.$parent.defaultActivePage === this.pageKey
            }
        }
    }
</script>
