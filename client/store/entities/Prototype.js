import randomName from 'adj-noun'

import ArgoEntity from './ArgoEntity'
import Dom from './Dom'

randomName.seed(Math.floor(Math.random() * 1000000))

class Prototype extends ArgoEntity {

    constructor (initData = {
        name: randomName().join(' '),
        editorState: {
            currentSelection: []
        }
    }) {

        super('prototype', initData.id)

        this.name = initData.name
        this.dom = new Dom(initData.dom)
        this.editorState = initData.editorState

    }

    hydrateDomTree () {
        this.dom.hydrateElements()
    }

}

export default Prototype
