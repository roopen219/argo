<script>
    import {mapMutations} from 'vuex'
    import * as types from '../../store/types'

    export default {
        name: 'argo-dom-element',
        render: function (createElement) {

            return createElement(this.tagName, [this.textContent].concat(this.childrenOrder.map((childKey) => {

                let child = this.children[childKey]

                return createElement(child.component, {
                    props: {
                        elementKey: childKey,
                        prototypeId: this.prototypeId,
                        ...child.props
                    }
                })

            })))

        },
        data: function() {
            return {tagName: 'div'}
        },
        mounted: function() {

            this.$el.addEventListener('click', (e) => {
                e.preventDefault()
                e.stopPropagation()

                this.elementSelected({
                    prototypeId: this.prototypeId,
                    elementKey: this.elementKey
                })
            })

        },
        methods: {
            ...mapMutations({
                elementSelected: types.SELECT_ELEMENT
            })
        },
        props: ['prototypeId', 'children', 'childrenOrder', 'class', 'elementKey', 'attrs']
    }
</script>
