import shortid from 'shortid'
import revalidator from 'revalidator'
import _ from 'lodash'

function ArgoEntityFactory(entityName, schema) {

    class ArgoEntity {

        constructor(initData) {

            let sanitizedData = _.pick(initData, Object.keys(schema.properties))

            let validationResult = revalidator.validate(sanitizedData, schema)

            if (!validationResult.valid) {
                throw Error(validationResult.errors)
            }

            _.merge(this, sanitizedData)

            this.id = initData.id || shortid.generate()
            this.entityName = initData.entityName || entityName

        }

    }

    // bind schema methods
    Object.keys(schema.methods).forEach((key) => {
        if (_.isFunction(schema.methods[key])) {
            ArgoEntity.prototype[key] = schema.methods[key].bind(this)
        }
    })

    return ArgoEntity

}

export default ArgoEntityFactory
