import shortid from 'shortid'

class ArgoEntity {

    constructor (entityName, id = shortid.generate()) {

        if (!entityName) throw Error('ArgoEntity: pass entityName')

        this.id = id
        this.entityName = entityName

    }

}

export default ArgoEntity
