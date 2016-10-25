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
  <div>
      <raml-tabs></raml-tabs>
  </div>
</template>

<script>
    export default {
        name: 'raml-app',
        data: function() {
            return {
                dom: window.arcDOM
            };
        }
    }
</script>
