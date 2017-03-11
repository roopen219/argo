export default function(lokiInstance) {

    function LokiAdaptor ({
        collectionName = null,
    }) {
        lokiInstance.addCollection(collectionName, collectionOptions)
    return LokiAdaptor
}
