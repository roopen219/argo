<style>
    .dom {
        flex: 10 1 auto;
    }
</style>

<template>
    <div class="dom">
        <component
            v-for="domElement in dom"
            :is="domElement.type"
            :tag-data="domElement">
        </component>
    </div>
</template>

<script>
    var domOptions = {
        name: 'arc-dom',
        props: ['dom']
    };

    module.exports = domOptions;
</script>
