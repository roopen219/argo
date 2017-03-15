<style lang="scss">
    @import "app";

    html {
        height: 100%;
    }

    body {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 0;
        font-size: 14px;
    }

    * {
        font-family: Roboto !important;
    }

    .dom-container {
        display: flex;
        height: 100%;
        width: 100%;
    }
</style>

<template>
    <div class="flex-column flex-grow-1">
        <argo-tab-group
            :tabs="tabGroup['prototype'].tabs"
            :switchTab="switchTab"
            :openTab="openTab"
            :closeTab="closeTab"
            :activeTab="getActiveTabIndex('prototype')">
        </argo-tab-group>
    </div>
</template>

<script>
    import * as types from '../store/types'
	import {mapState, mapActions, mapGetters} from 'vuex'

    export default {
        name: 'argo-app',
        computed: {
			...mapState(['tabGroup']),
            ...mapGetters(['getActiveTabIndex'])
		},
        data: function() {
            return {
                dom: window.arcDOM
            };
        },
        methods: {
            ...mapActions({
				_addTab: types.ADD_TAB,
                _removeTab: types.REMOVE_TAB,
				_switchTab: types.SWITCH_TAB,
                _addTabGroup: types.ADD_TAB_GROUP
			}),
            switchTab: function (tabIndex) {
                this._switchTab({
                    tabGroupId: 'prototype',
                    tabIndex
                })
            },
            openTab: function () {
                this._addTab({
                    tabGroupId: 'prototype',
                    tabContent: {
                        name: 'one more'
                    }
                })
            },
            closeTab: function (tabIndex) {
                this._removeTab({
                    tabGroupId: 'prototype',
                    tabIndex
                })
            }
        },
        created: function() {
            this._addTabGroup({
                tabGroupId: 'prototype',
                tabs: []
            })

            this._addTab({
                tabGroupId: 'prototype',
                tabContent: {
                    name: 'My First Prototype'
                }
            })

            this._addTab({
                tabGroupId: 'prototype',
                tabContent: {
                    name: 'Another one'
                }
            })
        }
    }
</script>
