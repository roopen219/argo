<style>
</style>

<script>
    export default {
        name: 'argo-dom-renderer',
        render: function (createElement) {
            let rootElement = this.prototype.dom.root

            return createElement(rootElement.component, {
                props: {
                    prototypeId: this.prototype.id,
                    elementKey: 'root',
                    ...rootElement.props
                }
            })
        },
        props: ['prototype']
    }
</script>
