<style lang="scss">
    .location-bar {
        .prev,
        .next {
            padding: 4px 8px;
        }

        .btn-default {
            font-size: 12px;
        }

        .btn-group {
            margin-right: 20px;
        }
    }

    .editor {
        overflow: hidden;
    }

    .canvas-wrapper {
        background: #fff;
        overflow: hidden;
    }

    .canvas {
        background: #eee;
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
    }

    .page-wrapper {
        display: flex;
        flex-direction: column;
    }

    .property-panel {
        background: #ECF0F1;
        max-width: 300px;
        min-width: 300px;
        position: relative;
        z-index: 2;
        box-shadow: -1px 0 4px rgba(0,0,0,0.15), inset 1px 1px 0 rgba(255,255,255,0.8);
        border-left: 1px solid #95A5A6;

        &-tab-row {
            display: flex;
            border-bottom: 1px solid #aaa;
        }

        &-tab {
            padding: 8px;
            min-width: 100px;
            text-align: center;
            text-transform: uppercase;
            font-size: 14px;
            font-weight: 700;
            color: #7F8C8D;
            letter-spacing: 1px;
            background: #E1E5E6;
            border-right: 1px solid #AAAAAA;
            box-shadow: inset 1px 1px 0 #fff;

            &:hover {
                background: lighten(#E1E5E6, 5%);
                cursor: pointer;
            }

            &-active {
                background: #ECF0F1;
                position: relative;

                &::after {
                    content: "";
                    position: absolute;
                    display: inline-block;
                    bottom: -2px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: #ecf0f1;
                }
            }
        }

        &-tab-view {
            box-shadow: inset 0 1px 0 #fff;
        }
    }
</style>

<template>
    <div class="editor flex-column flex-grow-1">
        <argo-location-bar>
            <div class="btn-group flex-row">
               <button class="prev btn-default"><i class="mdi-arrow-left"></i></button>
               <button class="next btn-default"><i class="mdi-arrow-right"></i></button>
            </div>
            <div class="btn-group flex-row">
               <button class="btn-default" @click="_savePrototype(tabContent.id)">Save</button>
            </div>
            <div class="btn-group flex-row">
                <button class="btn-default" @click="createElement('argo-dom-text')">Text</button>
                <button class="btn-default" @click="createElement('argo-dom-container')">Container</button>
            </div>
        </argo-location-bar>

        <div class="flex-grow-1 canvas-wrapper flex-row">
            <div class="canvas flex-grow-1" @click="elementSelected({elementId: 'root'})">
                <argo-dom-renderer :prototype="tabContent">
                </argo-dom-renderer>
            </div>
            <div class="property-panel flex-grow-1">
                <argo-tab-group
                    :tabs="tabs"
                    :switchTab="switchPropertyTab"
                    :activeTab="activePropertyTabIndex"
                    tabRowClass="property-panel-tab-row"
                    tabClass="property-panel-tab"
                    tabViewClass="property-panel-tab-view"
                    activeTabClass="property-panel-tab-active">
                </argo-tab-group>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex'
    import * as types from '../store/types'

    export default {
        name: 'argo-prototype-editor',
        computed: {
            tabs: function () {
                return [
                    {
                        tabContent: {
                            name: 'Outline',
                            dom: this.tabContent.dom
                        },
                        tabViewComponent: 'argo-outline'
                    },
                    {
                        tabContent: {
                            name: 'Style',
                            dom: this.tabContent.dom
                        },
                        tabViewComponent: 'argo-outline'
                    },
                    {
                        tabContent: {
                            name: 'State',
                            dom: this.tabContent.dom
                        },
                        tabViewComponent: 'argo-outline'
                    }
                ]
            }
        },
        data: function() {
            return {
                activePropertyTabIndex: 0
            }
        },
        methods: {

            ...mapMutations({
                _selectElement: types.SELECT_ELEMENT
            }),

            ...mapActions({
                _createElement: types.CREATE_ELEMENT,
                _savePrototype: types.SAVE_PROTOTYPE
            }),

            createElement: function(componentName) {
                this._createElement({
                    prototypeId: this.tabContent.id,
                    elementOptions: {
                        componentName
                    }
                })
            },

            elementSelected: function(event) {
                this._selectElement({
                    prototypeId: this.tabContent.id,
                    elementId: event.elementId
                })
            },

            switchPropertyTab: function(index) {
                this.activePropertyTabIndex = index;
            }

        },
        props: ['tabContent', 'tabIndex']
    }
</script>
