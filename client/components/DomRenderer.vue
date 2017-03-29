<style></style>

<script>
    export default {
        name: 'argo-dom-renderer',
        render: function (createElement) {
            return createElement('div', renderChildren(createElement, this.sharedStyles, this.dom.root.children))
        },
        props: ['dom', 'sharedStyles']
    }

    function renderChildren (createElement, sharedStyles, children = []) {

        return children.map(function(child) {
            return createElement(child.tagName, {
                props: {
                    ...child.props,
                    sharedStyles
                },
                attrs: child.attrs,
                style: [child.style, computeStyle(sharedStyles, child.class)]
            }, child.textContent || renderChildren(createElement, sharedStyles, child.children))

        })

    }

    function computeStyle (sharedStyles= {}, classes = []) {

        return classes.map(function (_class) {
            return sharedStyles[_class]
        })

    }
</script>
