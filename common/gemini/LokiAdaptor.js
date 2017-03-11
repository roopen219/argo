export default function(lokiInstance) {

    function LokiAdaptor ({
        collectionName = null,
    }) {

        if(!collectionName) {
            throw new Error('LokiAdaptor: pass a collectionName')
        }
        lokiInstance.addCollection(collectionName, collectionOptions)
    return LokiAdaptor
}
