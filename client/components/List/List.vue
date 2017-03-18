<style>
    .argo-list {
        padding: 0;

    }
</style>

<template>
    <ul class="argo-list">
        <component  :is="listItemComponent"
                    v-for="(listItem, index) in listItems"
                    :index="index"
                    :listItem="listItem">
        </component>
    </ul>
</template>

<script>
    export default {
        name: 'argo-list',
        props: {
            listItems: {
                type: Array,
                default: []
            },
            listItemComponent: {
                type: String,
                default: 'argo-list-item'
            }
        },
        created: function (){
            console.log(this.listItems)
        }
    }
</script>
