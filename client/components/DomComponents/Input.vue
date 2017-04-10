<script>
    import BaseElement from './Element.vue'

    export default {
        name: 'argo-dom-input',
        render: function(createElement) {
            return createElement(this.tagName, {
                attrs: this.attrs,
                'class': this.class
            })
        },
        data: function () {
            return {tagName: 'input'}
        },
        extends: BaseElement
    }
</script>
