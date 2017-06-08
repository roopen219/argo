<style>
</style>

<script>
    export default {
        name: 'argo-dom-renderer',
        data: function() {
            return {
                scale: 1,
                transformOrigin: '0 0'
            }
        },
        methods: {
            zoom: function (direction) {
                if (direction === 'in') {
                    this.scale += 0.1
                } else if (direction === 'out' && this.scale > 0.2) {
                    this.scale -= 0.1
                }
            }
        },
        render: function (createElement) {
            let rootElement = this.prototype.dom.elements.root

            return createElement('div', {
                style: {
                    height: '100%'
                },
                on: {
                    'wheel': function (e) {
                        e.metaKey ? e.deltaY > 0 ? this.zoom('in') : this.zoom('out') : ''
                    }.bind(this)
                }
            }, [createElement(rootElement.componentName, {
                props: {
                    prototypeId: this.prototype.id,
                    id: 'root',
                    ...rootElement.props
                }
            })])
        },
        props: ['prototype']
    }
</script>
