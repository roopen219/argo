import ArgoEntity from './ArgoEntity'

class Tab extends ArgoEntity {

    constructor({tabContent, tabViewComponent}) {

        super('tab')

        this.tabContent = tabContent
        this.tabViewComponent = tabViewComponent

    }

}

export default Tab
