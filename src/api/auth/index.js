import {apiService} from '..'

class Auth {
    login = data => {
        return apiService.post('account/login', data)
    }
}

export default new Auth()
