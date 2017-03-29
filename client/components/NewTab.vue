<style lang="scss">
    @import "variables";

    .new-tab-view {
        background: #fff;

        $bg-list-item: #fafafa;
        $color-list-item-border: #ccc;

        .list {
            padding: 0;

            .list-item {
                list-style: none;
                background: $bg-list-item;
                padding: 12px;
                margin-bottom: 8px;
                border-radius: 4px;
                border: 1px solid $color-list-item-border;
                text-transform: capitalize;
                transition: all 0.2s ease-in;

                &:hover {
                    cursor: pointer;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
                }
            }
        }

        .content-wrapper {
            overflow: auto;
            padding: 20px;
        }
    }
</style>

<template>
    <div class="flex-grow-1 new-tab-view flex-column">

        <argo-location-bar>
                <argo-select
                    containerClasses="flex-grow-1 flex"
                    inputFieldClasses="flex-grow-1"
                    :list="listOfPrototypes()"
                    :keys="['name']"
                    inputValueKey="name"
                    @valueSelected="openPrototype"
                    placeholder="Search for a prototype...">
                </argo-select>
        </argo-location-bar>

        <div class="flex-grow-1 content-wrapper">
            <button class="btn-primary" @click="createPrototype">+ Create New</button>
            <argo-list  :listItems="listOfPrototypes()"
                        class="list"
                        listItemClass="list-item"
                        @listItemClicked="openPrototype">
                <template scope="props">
                    <span>{{props.listItem.name}}</span>
                </template>
            </argo-list>
        </div>
    </div>
</template>

<script>
    import * as types from '../store/types'
	import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'

    export default {
        name: 'argo-new-tab',
        computed: {
            ...mapGetters(['listOfPrototypes'])
        },
        methods: {
            ...mapActions({
                _replaceTabContent: types.REPLACE_TAB_CONTENT,
                _createPrototype: types.CREATE_PROTOTYPE,
                _fetchPrototypes: types.FETCH_PROTOTYPES
            }),
            createPrototype: function() {
                this._createPrototype()
                    .then((prototype) => {
                        this._replaceTabContent({
                            tabGroupId: 'app',
                            tabIndex: this.tabIndex,
                            tabContent: prototype,
                            tabViewComponent: 'argo-prototype-editor'
                        })
                    })
            },
            openPrototype: function(prototype) {
                this._replaceTabContent({
                    tabGroupId: 'app',
                    tabIndex: this.tabIndex,
                    tabContent: prototype,
                    tabViewComponent: 'argo-prototype-editor'
                })
            }
        },
        props: ['tabContent', 'tabIndex'],
        created: function () {
            this._fetchPrototypes()
        }
    }
</script>
