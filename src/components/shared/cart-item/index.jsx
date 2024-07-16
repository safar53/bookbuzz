'use client'

import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'

import styles from './cart.module.scss'
import {shortenText} from 'src/utils/text'
import {routes} from 'src/utils/routes'
import {setCartItems} from 'src/store/header/headerSlice'
import {updateCountById} from 'src/utils/array'

const CartItem = ({
    product
}) => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.header.cartItems)

    const [count, setCount] = useState()

    const increment = () => {
        setCount(count + 1)
        dispatch(setCartItems(updateCountById(cartItems, product?.id)))
    }

    const decrement = () => {
        count > 1 ? setCount(count - 1) : setCount(1)
        count > 0 && dispatch(setCartItems(updateCountById(cartItems, product?.id, false)))
    }

    const remove = () => {
        dispatch(setCartItems(cartItems?.filter(item => item?.id !== product?.id)))
    }

    useEffect(() => {
        setCount(product?.count)
    }, [product])
    return (
        <div
            className={styles.cartItem}
        >
            <div className={styles.info}>
                <h3>
                    <Link href={routes.product.path.replace(':id', product?.id)}>
                        {product?.title}
                    </Link>
                </h3>
                <p>{shortenText(product?.subtitleShort, 20)}</p>
                <span className={styles.price}>{`$${product?.price}`}</span>
                <span className={styles.remover} onClick={remove}>-</span>
            </div>
            <div className={styles.image}>
                <Image
                    src={product?.mainImage}
                    width={200}
                    height={200}
                    alt={product?.title}
                />
                <div className={styles.count}>
                    <span onClick={decrement} className={styles.signs}>-</span>
                    <span>{count}</span>
                    <span onClick={increment} className={styles.signs}>+</span>
                </div>
            </div>
        </div>
    )
}

export default CartItem
