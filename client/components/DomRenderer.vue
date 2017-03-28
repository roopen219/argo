<style></style>

<script>
    export default {
        name: 'argo-dom-renderer',
        render: function (createElement) {
            return createElement('div', renderChildren(createElement, this.dom.root.children))
        },
        props: ['dom']
    }

    function renderChildren (createElement, children = []) {
        return children.map(function(child) {
            return createElement(child.tagName, {
                'class': child.class
            }, renderChildren(createElement, child.children))
        })
    }
</script>
