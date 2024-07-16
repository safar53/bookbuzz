import {apiService} from '..'

class Product {
    getProducts = () => {
        return apiService.get('product/explore', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
    getProductDetails = id => {
        return apiService.get(`product/details?productId=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
    searchProducts = key => {
        return apiService.get(`product/search?q=${key}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
}

export default new Product()
