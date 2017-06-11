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
            <div class="property-panel flex-grow-1"></div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex'
    import * as types from '../store/types'

    export default {
        name: 'argo-prototype-editor',
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
            }

        },
        props: ['tabContent', 'tabIndex']
    }
</script>
