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
                <button class="btn-default" @click="createElement('h1')">Create H1</button>
                <button class="btn-default" @click="createElement('p')">Create P</button>
                <button class="btn-default" @click="createElement('div')">Create DIV</button>
            </div>
        </argo-location-bar>

        <div class="flex-grow-1 canvas-wrapper flex-row">
            <div class="canvas flex-grow-9" @click="elementSelected({elementKey: 'root'})">
                <argo-dom-renderer :dom="tabContent.dom"
                                   :shared-styles="tabContent.sharedStyles"
                                    @elementSelected="elementSelected">
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

            createElement: function(tagName) {
                this._createElement({
                    prototypeId: this.tabContent.id,
                    element: {
                        tagName,
                        children: {},
                        childrenOrder: []
                    }
                })
            },

            elementSelected: function(event) {
                this._selectElement({
                    prototypeId: this.tabContent.id,
                    elementKey: event.elementKey
                })
            }

        },
        props: ['tabContent', 'tabIndex']
    }
</script>
