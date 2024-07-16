'use client'

import text from 'src/text.json'
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'

import styles from './page.module.scss'
import CartItem from 'src/components/shared/cart-item'
import ShopService from 'src/api/shop'

const Cart = () => {
    const cartItems = useSelector((state) => state.header.cartItems)

    const checkout = async() => {
        try {
            const payload = cartItems?.map(item => {
                return {
                    id: item?.id,
                    count: item?.count
                }
            })
            await ShopService.checkout({
                products: payload
            })
            toast.success('Order was places successufully!')
        } catch (e) {
            toast.error('Error occured')
        }
    }

    return (
        <main className={styles.cart}>
            {
                cartItems?.length > 0 ?
                    <>
                        <div className={styles.cartItems}>
                            {
                                cartItems?.map(item => (
                                    <CartItem
                                        key={item?.id}
                                        product={item}
                                    />
                                ))
                            }
                        </div>
                        <div className={styles.shoppingCart}>
                            <div>
                                <h3>{text.shopping_cart}</h3>
                                <div>
                                    <div className={styles.prices}>
                                        <p>{text.subtotal}</p>
                                        <span>{`$${cartItems?.reduce((total, item) => total + item?.count * item?.price, 0)}`}</span>
                                    </div>
                                    <div className={styles.prices}>
                                        <p>{text.shipping}</p>
                                        <span>$2.00</span>
                                    </div>
                                    <div className={styles.prices}>
                                        <p>{text.total}</p>
                                        <span>{`$${cartItems?.reduce((total, item) => total + item?.count * item?.price, 0) - 2.00}`}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={checkout}
                                >
                                    {text.checkout}
                                </button>
                            </div>
                        </div>
                    </> : <p>{text.no_result}</p>
            }
        </main>
    )
}

export default Cart
