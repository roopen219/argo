<template>
    <ul>
        <component  @click.native="_emitClickEvent(listItem)"
                    :is="listItemComponent"
                    v-for="(listItem, index) in listItems"
                    :key="listItem.id"
                    :index="index"
                    :listItem="listItem"
                    :listItemClass="listItemClass">
                    <slot :listItem="listItem"></slot>
        </component>
    </ul>
</template>

<script>
    import {MixinClassFactory} from '../../utils'

    export default {
        name: 'argo-list',
        mixins: [MixinClassFactory(['listItemClass'])],
        props: {
            listItems: {
                type: Array,
                default: function () { return [] }
            },
            listItemComponent: {
                type: String,
                default: 'argo-list-item'
            }
        },
        methods: {
            _emitClickEvent: function(listItem) {
                this.$emit('listItemClicked', listItem)
            }

        }
    }
</script>
