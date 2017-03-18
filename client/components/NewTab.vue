<style>
    .argo-new-tab {
        padding: 20px;
    }

</style>

<template>
    <div class="flex-grow-1 argo-new-tab">
        <button @click="createPrototype">+ Create New</button>
        <argo-list :listItems="listOfPrototypes">
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
