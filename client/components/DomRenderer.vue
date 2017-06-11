<style>
</style>

<script>
    export default {
        name: 'argo-dom-renderer',
        data: function () {
            return {
                scale: 0.5,
                transformOrigin: '0 0',
                translateX: 0,
                translateY: 0
            }
        },
        methods: {
            zoom: function (value) {
                if (value < 0 && this.scale < 0.2) {
                    return
                } else {
                    this.scale += value
                }
            },
            move: function (x, y) {

                this.translateX -= (parseInt(x) % 5)
                this.translateY -= (parseInt(y) % 5)

            }
        },
        render: function (createElement) {
            let rootElement = this.prototype.dom.elements.root

            return createElement('div', {
                class: 'page-wrapper',
                on: {
                    'wheel': function (e) {
                        if (e.metaKey) {
                            if (e.deltaY > 0) {
                                this.zoom(0.1)
                            } else {
                                this.zoom(-0.1)
                            }
                        } else {
                            this.move(e.deltaX, e.deltaY)
                        }
                    }.bind(this)
                }
            }, [createElement('div', {
                style: {
                    minHeight: '100%',
                    width: '1280px',
                    background: "#fff",
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                    flex: "0 0 auto",
                    transform: `scale(${this.scale}) translateX(${this.translateX}%) translateY(${this.translateY}%)`
                }
            }, [createElement(rootElement.componentName, {
                props: {
                    prototypeId: this.prototype.id,
                    id: 'root',
                    ...rootElement.props
                }
            })])])
        },
        props: ['prototype']

    }

</script>
