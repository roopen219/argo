export default function(lokiInstance) {

    function LokiAdaptor ({
        collectionName = null,
        collectionOptions = {},
    }) {

        if(!collectionName) {
            throw new Error('LokiAdaptor: pass a collectionName')
        }

        lokiInstance.addCollection(collectionName, collectionOptions)

        return {

            find: function () {

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
