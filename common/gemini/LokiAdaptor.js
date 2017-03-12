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

            find: function (params) {

                return new Promise((resolve, reject) => {

                    try {

                        let resultSet = this.collection.find(params)
                        resolve(resultSet)

                    } catch (e) {

                        reject(e)

                    }

                })

            },

            create: function (params) {

                return new Promise((resolve, reject) => {

                    try {

                        let insertedData = this.collection.insert(params.data)
                        resolve(insertedData)

                    } catch (e) {

                        reject(e)

                    }

                })

            },

            get: function (params) {

                return new Promise((resolve, reject) => {

                    try {

                        let resultSet = this.collection.findOne(params)
                        resolve(resultSet)

                    } catch (e) {

                        reject(e)

                    }

                })

            },

            patch: function () {

            },

            update: function () {

            },

            remove: function () {

            }

        }

    }

    return LokiAdaptor

}
