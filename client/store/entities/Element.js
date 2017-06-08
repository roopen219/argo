import Vue from 'vue'
import _ from 'lodash'

import ArgoEntity from './ArgoEntity'

class Element extends ArgoEntity {

    constructor(initData = {
        componentName: 'argo-dom-container',
        props: {}
    }) {

        let _defaultProps = {
            parent: null,
            children: [],
            'class': [],
            style: {},
            config: {},
            attrs: {},
            textContent: ''
        }

        super('element', initData.id)

        this.componentName = initData.componentName
        this.props = _.merge({}, _defaultProps, initData.props)

    }

    addChild(child) {

        let children = this.props.children

        if (children.indexOf(child) !== -1) {
            throw Error(`child with key ${child} already present`)
        }

        this.props.children.push(child)

    }

    removeChild(child) {
        this.props.children.splice(this.props.children.indexOf(child), 1)
    }

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

export default Element
