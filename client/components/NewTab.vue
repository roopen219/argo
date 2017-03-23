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
            }
        }

        .content-wrapper {
            overflow: auto;
            padding: 20px;
        }

        .location-bar {
            padding: 8px 20px;
            background: $bg-tab-active;
            border-bottom: 1px solid $color-tabs-border;
            min-height: 46px;

            input[type="text"] {
                padding-left: 52px;
            }

            .prev, .next {
                padding: 8px;
            }

            .search-input-wrapper {
                position: relative;

                .placeholder {
                    position: absolute;
                    top: 5px;
                    left: 8px;
                }
            }
        }
    }
</style>

<template>
    <div class="flex-grow-1 new-tab-view flex-column">
        <div class="location-bar flex-row">
            <!--<div class="btn-group flex-row">
                <button class="prev btn-default"><i class="mdi-arrow-left"></i></button>
                <button class="next btn-default"><i class="mdi-arrow-right"></i></button>
            </div>-->
            <div class="search-input-wrapper flex-row flex-grow-1">
                <span class="placeholder text-muted">argo://</span>
                <input type="text" class="flex-grow-1 input-text" :value="tabContent.query" @input="updateQuery">
            </div>
        </div>
        <div class="flex-grow-1 content-wrapper">
            <button class="btn-primary" @click="createPrototype">+ Create New</button>
            <argo-list  :listItems="listOfPrototypes"
                        class="list"
                        listItemClass="list-item">
                    <template scope="props">
                        <span>{{props.listItem.name}}</span>
                    </template>
            </argo-list>
        </div>
    </div>
</template>

<script>
    import * as types from '../store/types'
	import {mapState, mapActions, mapGetters} from 'vuex'

    export default {
        name: 'argo-new-tab',
        computed: {
            ...mapGetters(['listOfPrototypes'])
        },
        methods: {
            ...mapActions({
                _addTab: types.ADD_TAB,
                _createProtoype: types.CREATE_PROTOTYPE,
                _fetchPrototypes: types.FETCH_PROTOTYPES
            }),
            createPrototype: function() {
                this._createProtoype()
                    .then((prototype) => {
                        this._addTab({
                            tabGroupId: 'app',
                            tabContent: prototype,
                            tabViewComponent: 'argo-dummy'
                        })
                    })
            },
            updateQuery: function(e) {
                this.$store.commit(types.UPDATE_TAB_CONTENT, {
                    tabGroupId: 'app',
                    tabIndex: this.tabIndex,
                    tabContent: {
                        query: e.target.value
                    }
                })
            }
        },
        props: ['tabContent', 'tabIndex'],
        created: function () {
            this._fetchPrototypes()
        }
    }
</script>
