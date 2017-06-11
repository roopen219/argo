import randomName from 'adj-noun'

import ArgoEntityFactory from './ArgoEntityFactory'
import Dom from './Dom'

randomName.seed(Math.floor(Math.random() * 1000000))

let schema = {
    name: {
        type: 'string',
        default: () => {
            return randomName().join(' ')
        }
    },
    dom: {
        type: 'object',
        default: () => new Dom(),
        deserialize: (dom) => new Dom(dom)
    }
}

let Prototype = ArgoEntityFactory('prototype', schema)

export default Prototype
