<style lang="scss">
    @import "variables";

    .new-tab-view {
        padding: 20px;
        background: #fff;

        .list {
            padding: 0;

            .list-item {
                list-style: none;
            }
        }

        .location-bar {
            padding: 4px 20px;
            margin: -20px -20px 20px -20px;
            background: $bg-tab-active;
            border-bottom: 1px solid $color-tabs-border;

            input[type="text"] {
                margin-left: 12px;
            }
        }
    }
</style>

<template>
    <div class="flex-grow-1 new-tab-view">
        <div class="location-bar flex-row">
            <div class="btn-group">
                <button class="prev btn-default">&laquo;</button>
                <button class="next btn-default">&raquo;</button>
            </div>
            <input type="text" class="input-text flex-grow-1" placeholder="Open...">
        </div>
        <button class="btn-primary" @click="createPrototype">+ Create New</button>
        <argo-list  :listItems="listOfPrototypes"
                    class="list"
                    listItemClass="list-item">
        </argo-list>
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
            }
        },
        created: function () {
            this._fetchPrototypes()
        }
    }
</script>
