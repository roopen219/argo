<template>
    <li v-if="listItem">{{this.listItem.name}} &mdash; {{Date(this.listItem.meta.created)}}</li>
</template>

<script>
    export default {
        name: 'argo-list-item',
        props: ['listItem'],
        created: function() {
            console.log(this.listItem)
        }
    }
</script>
