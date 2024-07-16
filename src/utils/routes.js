const routeItem = path => {
    return {
        path
    }
}

const routes = {
    home: routeItem('/'),
    login: routeItem('/login/'),
    cart: routeItem('/cart/'),
    products: routeItem('/products/'),
    product: routeItem('/product/:id/')
}

const routesArr = Object.values(routes)

export {routes, routesArr}

