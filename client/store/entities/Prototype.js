import randomName from 'adj-noun'

import ArgoEntity from './ArgoEntity'
import Dom from './Dom'

randomName.seed(Math.floor(Math.random() * 1000000))

class Prototype extends ArgoEntity {

    constructor (initData = {}) {

        super('prototype', initData.id)

        this.schema = {
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

        this.deserialize(initData)

    }

}

export default Prototype
