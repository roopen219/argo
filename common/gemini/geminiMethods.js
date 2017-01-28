const GEMINI_METHODS = {
    CREATE: {
        name: 'create',
        notify: true
    },
    FIND: {
        name: 'find',
        notify: false
    },
    GET: {
        name: 'get',
        notify: false
    },
    PATCH: {
        name: 'patch',
        notify: true
    },
    UPDATE: {
        name: 'update',
        notify: true
    },
    REMOVE: {
        name: 'remove',
        notify: true
    }
}

export default GEMINI_METHODS
