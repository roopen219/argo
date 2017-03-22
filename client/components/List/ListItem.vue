<template>
    <li :class="listItemClass">
        <slot>{{this.listItem.name}}</slot>
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
