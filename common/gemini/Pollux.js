import _ from 'lodash'
import debug from 'debug'

import Gemini from './Gemini'

let log = debug('pollux')

class Pollux extends Gemini {

    constructor() {

        super()

        this.whichGemini = 'pollux'

    }

}

export default Pollux
