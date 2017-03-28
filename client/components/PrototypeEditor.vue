<style lang="scss">
    .location-bar {
        .prev,
        .next {
            padding: 4px 8px;
        }

        .btn-default {
            font-size: 12px;
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
        </argo-location-bar>

        <div class="flex-grow-1 canvas-wrapper flex-row">
            <div class="canvas flex-grow-9">
                <argo-dom-renderer :dom="tabContent.dom"></argo-dom-renderer>
            </div>
            <div class="property-panel flex-grow-1"></div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'argo-prototype-editor',
        props: ['tabContent', 'tabIndex']
    }
</script>
