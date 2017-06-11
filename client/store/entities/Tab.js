import ArgoEntityFactory from './ArgoEntityFactory'

let schema = {
    tabContent: {
        type: 'object',
        default: () => {return {}}
    },
    tabViewComponent: {
        type: 'string',
        required: true
    }
}

let Tab = ArgoEntityFactory('tab', schema)

export default Tab
