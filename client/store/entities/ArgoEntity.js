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

            isFunction = _.isFunction(this.schema[field].default)

            if(isFunction) {
                defaultValues[field] = this.schema[field].default()
            } else {
                defaultValues[field] = this.schema[field].default //TODO: need to copy instead of just assign
            }

        })

        return defaultValues

    }

    _getDeserializedValues(data) {

        let fieldsInSchema = Object.keys(this.schema)
        let fieldsPresentInData = _.pick(data, fieldsInSchema)

        return _.mapValues(fieldsPresentInData, (field, key) => {

            let deserializeFn = this.schema[key].deserialize

            if(_.isFunction(deserializeFn)) {
                return deserializeFn(field)
            }

            return field

        })

    }

    _sanitize(data) {

        return _.merge({}, this._getDeserializedValues(data), this._getDefaultValues(data))

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

        let sanitizedData = this._sanitize(data)
        let validationResult = this._validate(sanitizedData)

        if(!validationResult.valid) {
            throw Error(JSON.stringify(validationResult.errors))
        }

        _.merge(this, sanitizedData)

    }

}

export default ArgoEntity
