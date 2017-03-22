<template>
    <ul>
        <component  :is="listItemComponent"
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
        created: function (){
            console.log(this.listItems)
        }
    }
</script>
