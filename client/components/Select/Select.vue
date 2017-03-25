<style lang="scss">
    .argo-select-list {
        position: absolute;
        left: 0px;
        top: calc(100% + 4px);
        right: 0;
        margin: 0;
        list-style: none;
        padding: 8px 0;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 2px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.30);

        &-item {
            padding: 8px 12px;
            text-transform: capitalize;

            &:hover {
                background-color: #FAFAFA;
                cursor: pointer;
            }
        }
    }
</style>

<template>
    <div :class="containerClasses">
        <input  type="text"
                :class="['input-text', inputFieldClasses]"
                v-model="input"
                @input="emitChange">
        <argo-list  :listItems="filteredList"
                    class="argo-select-list"
                    listItemClass="argo-select-list-item">
        </argo-list>
    </div>
</template>

<script>
    import Fuse from 'fuse.js'
    import {MixinClassFactory} from '../../utils'

    export default {
        name: 'argo-select',
        data: function () {
            return {
                input: this.initialInputValue,
                fuseOptions: {
                    shouldSort: true,
                    threshold: 0.4,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: this.keys
                }
            }
        },
        computed: {
            filteredList: function () {
                this.fuse.list = this.list
                return this.fuse.search(this.input) || []
            }
        },
        mixins: [MixinClassFactory(['containerClasses', 'inputFieldClasses'])],
        props: {
            list: {
                type: [Array, Object],
                default: function () {
                    return []
                }
            },
            keys: {
                type: [Array],
                default: function () {
                    return []
                }
            },
            initialInputValue: {
                type: String,
                default: ''
            }
        },
        methods: {
            emitChange: function () {
                this.$emit('inputChanged', this.input)
            }
        },
        created: function () {
            this.fuse = new Fuse(this.list, this.fuseOptions)
        }
    }
</script>
