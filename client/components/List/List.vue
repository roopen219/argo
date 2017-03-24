<template>
    <ul>
        <component  @click.native="_emitClickEvent(listItem)"
                    :is="listItemComponent"
                    v-for="(listItem, index) in listItems"
                    :index="index"
                    :listItem="listItem"
                    :listItemClass="listItemClass">
                    <slot :listItem="listItem"></slot>
        </component>
    </ul>
</template>

<script>
    export default {
        name: 'argo-list',
        props: {
            listItems: {
                type: Array,
                default: function () { return [] }
            },
            listItemComponent: {
                type: String,
                default: 'argo-list-item'
            },
            listItemClass: {
                type: [Object, String],
                default: function () { return {} }
            }
        },
        methods: {
            _emitClickEvent: function(listItem) {
                this.$emit('listItemClicked', listItem)
            }

        }
    }
</script>
