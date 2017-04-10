<script>
    import BaseElement from './Element.vue'

    export default {
        name: 'argo-dom-text',
        data: function () {
            return {tagName: 'p'}
        },
        props: ['textContent'],
        extends: BaseElement
    }
</script>
