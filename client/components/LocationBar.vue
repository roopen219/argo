<style lang="scss">
    @import "variables";

    .location-bar {
        padding: 8px 20px;
        background: $bg-tab-active;
        border-bottom: 1px solid $color-tabs-border;
        min-height: 46px;

        input[type="text"] {
            padding-left: 52px;
        }

        .prev,
        .next {
            padding: 8px;
        }

        .search-input-wrapper {
            position: relative;

            .placeholder {
                position: absolute;
                top: 5px;
                left: 8px;
            }
        }
    }
</style>


<template>
    <div class="location-bar flex-row">
        <!--<div class="btn-group flex-row">
                <button class="prev btn-default"><i class="mdi-arrow-left"></i></button>
                <button class="next btn-default"><i class="mdi-arrow-right"></i></button>
            </div>-->
        <div class="search-input-wrapper flex-row flex-grow-1">
            <span class="placeholder text-muted">argo://</span>
            <argo-select
                    containerClasses="flex-grow-1 flex"
                    inputFieldClasses="flex-grow-1"
                    :list="list"
                    :keys="['name']">
            </argo-select>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'argo-location-bar',
        props: {
            inputValue: {
                type: [Object, String]
            },
            showNavigationButtons: {
                type: [Boolean],
                default: true
            },
            list: {
                type: Array
            }
        },
        methods: {
            emitChange: function(data) {
                this.$emit('inputChanged', data)
            }
        }
    }
</script>
