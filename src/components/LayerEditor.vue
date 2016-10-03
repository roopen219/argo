<style>
    .layer-editor {
        flex: 1 1 auto;
        background: #fafafa;
        border-left: 1px solid #ccc;
        padding: 10px 0;
    }
</style>

<template>
    <div class="layer-editor">
        <arc-layer-editor-row :is-sub="false" :dom-element="domElement" v-for="domElement in dom">
        </arc-layer-editor-row>
    </div>
</template>

<script>
    var layerEditorOptions = {
        name: 'arc-layer-editor',
        props: ['dom']
    };

    module.exports = layerEditorOptions;
</script>
