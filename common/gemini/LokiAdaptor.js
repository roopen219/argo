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

            },

            create: function () {

            },

            get: function () {

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
