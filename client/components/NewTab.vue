<style lang="scss">
    .new-tab-view {
        padding: 20px;

        .list {
            padding: 0;

            .list-item {
                list-style: none;
            }

        }
    }
</style>

<template>
    <div class="flex-grow-1 new-tab-view">
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
