<style lang="scss">
    @import "app";

    html {
        height: 100%;
    }

    body {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 0;
        font-size: 14px;
    }

    * {
        font-family: Roboto !important;
    }

    .dom-container {
        display: flex;
        height: 100%;
        width: 100%;
    }
</style>

<template>
  <div class="flex-column flex-grow-1">
      <argo-tab-group></argo-tab-group>
      <argo-tab-content></argo-tab-content>
  </div>
</template>

<script>
    export default {
        name: 'argo-app',
        data: function() {
            return {
                dom: window.arcDOM
            };
        }
    }
</script>
