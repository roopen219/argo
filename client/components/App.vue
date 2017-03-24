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
        font-family: Roboto;
        box-sizing: border-box;
    }

    .argo-logo {
        line-height: 1;
        align-self: center;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 3px;
        position: absolute;
        top: 12px;
        font-size: 11px;
        left: 20px;
    }

    .app-view {
        overflow: hidden;
    }
</style>

<template>
    <div class="flex-column flex-grow-1 app-view">
        <span class="argo-logo">
            Argo
        </span>
        <argo-tab-group
            wrapperClass="flex-column flex-grow-1 app-tab-view"
            tabRowClass="tab-row flex-row"
            newTabButtonClass="btn-open-new-tab"
            tabClass="tab"
            activeTabClass="active"
            tabCloseButtonClass="close"
            tabViewClass="tab-content flex-grow-1 flex-column"
            :tabs="tabGroup['app'].tabs"
            :switchTab="switchTab"
            :openTab="openTab"
            :closeTab="closeTab"
            :activeTab="getActiveTabIndex('app')">
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
        methods: {
            ...mapActions({
				_addTab: types.ADD_TAB,
                _removeTab: types.REMOVE_TAB,
				_switchTab: types.SWITCH_TAB,
                _addTabGroup: types.ADD_TAB_GROUP,
                _createPrototype: types.CREATE_PROTOTYPE
			}),
            switchTab: function (tabIndex) {
                this._switchTab({
                    tabGroupId: 'app',
                    tabIndex
                })
            },
            openTab: function () {
                this._addTab({
                    tabGroupId: 'app',
                    tabContent: {name: 'New Tab'},
                    tabViewComponent: 'argo-new-tab'
                })
            },
            closeTab: function (tabIndex) {
                this._removeTab({
                    tabGroupId: 'app',
                    tabIndex
                })
            }
        },
        created: function() {
            this._addTabGroup({
                tabGroupId: 'app',
                tabs: []
            })

            this.openTab()
        }
    }
</script>
