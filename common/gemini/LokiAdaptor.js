/*global Promise*/

export default function(lokiInstance) {

    function LokiAdaptor ({
        collectionName = null,
        collectionOptions = {},
        hooks = {}
    }) {

        if(!collectionName) {
            throw new Error('LokiAdaptor: pass a collectionName')
        }

        let collection = lokiInstance.addCollection(collectionName, collectionOptions)

        return {

            hooks,

            collection,

            find: function ({query, params}) {

                return new Promise((resolve, reject) => {

                    try {

                        let resultSet = this.collection.find(query)
                        resolve(resultSet)

                    } catch (e) {

                        reject(e)

                    }

                })

            },

            create: function ({data, params}) {

                return new Promise((resolve, reject) => {

                    try {

                        let insertedData = this.collection.insert(data)
                        resolve(insertedData)

                    } catch (e) {

                        reject(e)

                    }

                })

            },

            get: function ({id, params}) {

                return new Promise((resolve, reject) => {

                    try {

                        let result = this.collection.findOne({id})
                        resolve(result)

                    } catch (e) {

                        reject(e)

                    }

                })

            },

            patch: function (params) {
                return this.update(params)
            },

            update: function ({id, data, params}) {

                if (data) {
                    delete data['id']
                }

                return new Promise((resolve, reject) => {

                    try {

                        this.collection.findAndUpdate({id}, function(doc) {
                            doc = Object.assign(doc, data)
                        })

                        let result = this.collection.findOne({id})
                        resolve(result)

                    } catch (e) {

                        reject(e)

                    }

                })

            },

            remove: function ({id, params}) {

                return new Promise((resolve, reject) => {

                    try {

                        let docToRemove = this.collection.findOne({id})

                        this.collection.remove(docToRemove)

                        resolve(docToRemove)

                    } catch (e) {

                        reject(e)

                    }

                })

            }

        }

    }

    return LokiAdaptor

}
