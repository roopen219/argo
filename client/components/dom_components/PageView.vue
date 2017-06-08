<script>
    import BaseElement from './Element.vue'

    export default {
        name: 'argo-dom-page-view',
        props: ['defaultActivePage'],
        extends: BaseElement,
        render: function(createElement) {

            let childToShow = this.children[this.config.defaultActivePage]

            return createElement(childToShow.componentName, {
                props: {
                    prototypeId: this.prototypeId,
                    key: this.defaultActivePage,
                    id: childToShow.id,
                    ...childToShow.props
                }
            })

        }
    }
</script>
