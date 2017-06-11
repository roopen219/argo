<template>
    <div>{{Object.keys(tabContent.dom)[0]}}</div>
</template>

<script>
export default {
    name: 'argo-outline',
    props: ['tabContent', 'tabIndex']
}
</script>
