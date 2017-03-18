<style>
    .argo-list-item {
        list-style: none;
    }
</style>

<template>
    <li class="argo-list-item">
        {{this.listItem.name}} &mdash; {{Date(this.listItem.meta.created)}}
    </li>
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
