<script>
    import BaseElement from './Element.vue'

    export default {
        name: 'argo-page-view',
        props: ['defaultActivePage'],
        extends: BaseElement,
        render: function(createElement) {

            let childToShow = this.children[this.defaultActivePage]

            return createElement(childToShow.component, {
                props: {
                    prototypeId: this.prototypeId,
                    elementKey: this.defaultActivePage,
                    key: this.defaultActivePage,
                    ...childToShow.props
                }
            })

        }
    }
</script>
