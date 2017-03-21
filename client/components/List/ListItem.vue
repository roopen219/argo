<template>
    <li :class="listItemClass">
        {{this.listItem.name}} &mdash; {{Date(this.listItem.meta.created)}}
    </li>
</template>

<script>
    export default {
        name: 'argo-list-item',
        props: {
            listItem: {
                type: Object,
                required: true
            },
            listItemClass: {
                type: [Object, String],
                default: function () { return {} }
            }
        },
        created: function() {
            console.log(this.listItem)
        }
    }
</script>
