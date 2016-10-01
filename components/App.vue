<style>
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
      <arc-navbar></arc-navbar>
      <arc-command-pallete></arc-command-pallete>
      <div class="dom-container">
          <arc-dom :dom="dom"></arc-dom>
          <arc-layer-editor :dom="dom"></arc-layer-editor>
      </div>
  </div>
</template>

<script>
    module.exports = {
        name: 'arc-app',
        data: function() {
            return {
                dom: window.arcDOM
            };
        }
    };
</script>
