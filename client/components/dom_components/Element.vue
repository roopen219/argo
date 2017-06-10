<script>
    import {mapMutations, mapGetters} from 'vuex'
    import * as types from '../../store/types'

    export default {
        name: 'argo-dom-element',
        render: function (createElement) {

            return createElement(this.tagName, {
                style: {
                    ...this.style
                }
            }, [this.textContent].concat(this.children.map((childId) => {

                let child = this.getElements(this.prototypeId)[childId]

                return createElement(child.componentName, {
                    props: {
                        prototypeId: this.prototypeId,
                        id: child.id,
                        ...child.props
                    }
                })

            })))

        },
        computed: {
            ...mapGetters(['getElements'])
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
                    elementId: this.id
                })
            })

        },
        methods: {
            ...mapMutations({
                elementSelected: types.SELECT_ELEMENT
            })
        },
        props: ['prototypeId', 'id', 'children', 'class', 'attrs', 'style', 'textContent', 'config']
    }
</script>
