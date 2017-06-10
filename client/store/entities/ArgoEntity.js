import shortid from 'shortid'
import revalidator from 'revalidator'
import _ from 'lodash'

class ArgoEntity {

    constructor(entityName, id = shortid.generate()) {

        if (!entityName) throw Error('ArgoEntity: pass entityName')

        this.id = id
        this.entityName = entityName

    }

    _getDefaultValues(data) {

        let fieldsInSchema = Object.keys(this.schema)
        let fieldsPresentInData = Object.keys(_.pick(data, fieldsInSchema))
        let fieldsNotPresentInData = _.difference(fieldsInSchema, fieldsPresentInData)

        let defaultValues = {}

        fieldsNotPresentInData.forEach((field) => {

            let isDefaultValueFunction = _.isFunction(this.schema[field])

            if(!isDefaultValueFunction) {
                defaultValues[field] = this.schema[field].default //TODO: need to copy instead of just assign
            }
        })

        return defaultValues
    }

    _sanitize(data) {

        let fieldsInSchema = Object.keys(this.schema)

        return _.merge(data, this._getDefaultValues(data))

    }

    _validate(data) {

        return revalidator.validate(data, {
            properties: {
                ...this.schema
            }
        })

    }

    deserialize(data) {

        if (!this.schema) {
            throw Error('No schema specified')
        }

        this._sanitize(data)
        let validationResult = this._validate(data)

        if(!validationResult.valid) {
            throw Error(JSON.stringify(validationResult.errors))
        }

        _.merge(this, data)

    }

}

export default ArgoEntity
