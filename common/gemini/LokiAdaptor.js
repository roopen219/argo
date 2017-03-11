export default function(lokiInstance) {

    function LokiAdaptor ({
        collectionName = null,
        collectionOptions = {},
        hooks = {}
    }) {

        if(!collectionName) {
            throw new Error('LokiAdaptor: pass a collectionName')
        }

        lokiInstance.addCollection(collectionName, collectionOptions)

        return {

            hooks,

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
