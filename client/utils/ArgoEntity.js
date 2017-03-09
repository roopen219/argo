import rand from 'random-key'

export default class ArgoEntity {
    constructor (type) {
        this.id = rand.generate()
        this.type = type
    }
}
