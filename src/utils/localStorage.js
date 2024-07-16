const localStorageManager = {
    set: (name, data) => {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(name, JSON.stringify(data))
        }
    },
    get: name => {
        if (typeof window !== 'undefined' && window.localStorage) {
            return JSON.parse(localStorage.getItem(name))
        }
        return null
    }
}

export default localStorageManager
