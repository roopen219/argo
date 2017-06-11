import shortid from 'shortid'
import revalidator from 'revalidator'
import _ from 'lodash'

function ArgoEntityFactory(entityName, schema, methods = {}) {

    if (!entityName) throw Error('ArgoEntity: pass entityName')
    if (!schema) throw Error('ArgoEntity: no schema specified')

    class ArgoEntity {

        constructor(initData = {}) {

            this.id = initData.id || shortid.generate()
            this.entityName = entityName

            this.deserialize(initData)

        }

        _getDefaultValues(data) {

            let fieldsInSchema = Object.keys(schema)
            let fieldsPresentInData = Object.keys(_.pick(data, fieldsInSchema))
            let fieldsNotPresentInData = _.difference(fieldsInSchema, fieldsPresentInData)

            let defaultValues = {}

            fieldsNotPresentInData.forEach((field) => {

                let notPrimitiveFieldTypes = ['array', 'object']

                let fieldType = schema[field].type
                let fieldTypeNotPrimitive = _.isArray(fieldType) ?
                                                _.intersection(fieldType, notPrimitiveFieldTypes).length :
                                                notPrimitiveFieldTypes.includes(fieldType)

                let isDefaultFunction = _.isFunction(schema[field].default)

                if (fieldTypeNotPrimitive && !isDefaultFunction) {

                    throw Error(`pass a function as default value for field ${field}`)

                } else if(isDefaultFunction) {

                    defaultValues[field] = schema[field].default()

                } else {

                    defaultValues[field] = schema[field].default

                }

            })

            return defaultValues

        }

        _getDeserializedValues(data) {

            let fieldsInSchema = Object.keys(schema)
            let fieldsPresentInData = _.pick(data, fieldsInSchema)

            return _.mapValues(fieldsPresentInData, (field, key) => {

                let deserializeFn = schema[key].deserialize

                if (_.isFunction(deserializeFn)) {
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
                    ...schema
                }
            })

        }

        deserialize(data) {

            let sanitizedData = this._sanitize(data)
            let validationResult = this._validate(sanitizedData)

            if (!validationResult.valid) {
                throw Error(JSON.stringify(validationResult.errors))
            }

            _.merge(this, sanitizedData)

        }

    }

    Object.keys(methods).forEach((key) => {
        if (_.isFunction(methods[key])) {
            ArgoEntity.prototype[key] = methods[key]
        }
    })

    return ArgoEntity
}

export default ArgoEntityFactory
