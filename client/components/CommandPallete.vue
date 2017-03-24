<template>
    <div class="flex-column command-pallete">
        <input
            class="input-large"
            type="text"
            name="command"
            placeholder="Type in the action you want to take... ('?' for help)"
        />
    </div>
</template>

<script>
    export default {
        name: 'arc-command-pallete'
    }
</script>

<style lang="scss" scoped>
    @import "variables";

    .command-pallete {
        max-height: 60%;
        position: absolute;
        margin: auto;
        top: 10%;
        left: 50%;
        transform: translate(-50%,0%);
        width: 600px;
        padding: 10px;
        background: #4F5966;
        color: $primary;
    }
</style>
