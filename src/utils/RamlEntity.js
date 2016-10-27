import rand from 'random-key'

export default class RamlEntity {
    constructor (type) {
        this.id = rand.generate()
        this.type = type
    }
}