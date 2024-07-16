import {apiService} from '..'

class Shop {
    checkout =  data => {
        return apiService.post('shop/checkout', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
}

export default new Shop()
