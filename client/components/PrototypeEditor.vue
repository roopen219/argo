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
        background: aqua;
        overflow: auto;
    }

    .property-panel {
        background: aquamarine;
        max-width: 300px;
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
                _createElement: types.CREATE_ELEMENT
            }),

            createElement: function(componentName) {
                this._createElement({
                    prototypeId: this.tabContent.id,
                    elementOptions: {
                        componentName,
                        props: {}
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
