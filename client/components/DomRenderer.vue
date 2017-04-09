<style>
</style>

<script>
    export default {
        name: 'argo-dom-renderer',
        render: function (createElement) {
            return createElement('div', renderChildren(createElement, this.sharedStyles, this.dom.root, {
                clickHandler: this.clickHandler
            }))
        },
        methods: {
            clickHandler: function(elementKey) {
                let _this = this

                return function(event) {
                    event.preventDefault()
                    event.stopPropagation()
                    _this.$emit('elementSelected', {
                        elementKey,
                        _nativeEvent: event
                    })
                }
            }
        },
        props: ['dom', 'sharedStyles']
    }

    function renderChildren (createElement, sharedStyles, dom, eventHandlers) {

        let children = dom.childrenOrder || []

        return children.map(function(childKey) {

            let child = dom.children[childKey]

            return createElement(child.tagName, {
                props: {
                    ...child.props,
                    sharedStyles
                },
                attrs: child.attrs,
                on: {
                    click: eventHandlers.clickHandler(childKey)
                },
                style: [{cursor: 'default'},child.style, ...computeStyle(sharedStyles, child.class)]
            }, [child.textContent].concat(renderChildren(createElement, sharedStyles, child, eventHandlers)))

        })

    }

    function computeStyle (sharedStyles= {}, classes = []) {

        return classes.map(function (_class) {
            return sharedStyles[_class]
        })

    }
</script>
