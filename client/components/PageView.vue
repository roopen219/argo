<template>
    <argo-dom-renderer :dom="views[defaultActivePage]" :shared-styles="sharedStyles"></argo-dom-renderer>
</template>
<script>
    export default {
        name: 'argo-page-view',
        props: ['defaultActivePage', 'views', 'sharedStyles']
    }
</script>
