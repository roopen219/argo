import Vue from 'vue'

import ArgoEntityFactory from './ArgoEntityFactory'

let schema = {
    componentName: {
        type: 'string',
        default: 'argo-dom-container'
    },
    props: {
        type: 'object',
        default: function () {
            return {
                parent: null,
                children: [],
                'class': [],
                style: {},
                config: {},
                attrs: {},
                textContent: ''
            }
        }
    }
}

let methods = {

    addChild(child) {

        let children = this.props.children

        if (children.indexOf(child) !== -1) {
            throw Error(`child with key ${child} already present`)
        }

        this.props.children.push(child)

    },

    removeChild(child) {
        this.props.children.splice(this.props.children.indexOf(child), 1)
    },

    addClass(className) {

        if (!className) {
            throw Error('pass a class')
        } else if (Array.isArray(className)) {
            this.props.class = this.props.class.concat(className)
        } else {
            this.props.class.push(className)
        }

    }

}

let Element = ArgoEntityFactory('element', schema, methods)

export default Element
