import Pollux from '../common/gemini/Pollux'
import Loki from 'lokijs'
import LokiIndexedAdaptor from 'lokijs/src/loki-indexed-adapter'
import GeminiLokiAdaptor from '../common/gemini/LokiAdaptor'

var idbAdaptor = new LokiIndexedAdaptor()
let lokiDb = new Loki('argo.db', {
    adapter: idbAdaptor,
    autoload: true,
    autosave: true,
    env: 'BROWSER'
})

let pollux = new Pollux()

lokiDb.on('loaded', (event) => {

    let lokiService = GeminiLokiAdaptor(lokiDb)

    pollux.use('prototype', lokiService({
        collectionName: 'prototype',
        collectionOptions: {
            unique: ['id']
        }
    }))

})

window.loki = lokiDb
window.pollux = pollux

export default pollux
