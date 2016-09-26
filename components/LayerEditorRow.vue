
<style>
    .layer-editor-row-parent {
        list-style: none;
    }
</style>
<template>
    <ul :class="classObject">
        <li :class="domElement.children ? 'uk-parent uk-open' : ''">
            <a href="#">{{domElement.type}}</a>
            <arc-layer-editor-row :is-sub="true" :dom-element="child" v-for="child in domElement.children">
            </arc-layer-editor-row>
        </li>
    </ul>
</template>

<script>
    module.exports = {
        name: 'arc-layer-editor-row',
        props: ['domElement', 'isSub'],
        computed: {
            classObject: function() {
                if(!this.isSub) {
                    return 'layer-editor-row-parent uk-nav uk-nav-side uk-nav-parent-icon';
                }
                return 'uk-nav-sub';
            }
        }
    }
</script>
