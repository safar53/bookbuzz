'use client'

import {useState, useEffect} from 'react'

import styles from './page.module.scss'
import text from 'src/text.json'
import {routes} from 'src/utils/routes'
import ProductService from 'src/api/product'
import Card from 'src/components/shared/card'

const Products = () => {
    const [products, setProducts] = useState([])

    const getProducts = async() => {
        try {
            const {result} = await ProductService.getProducts()
            setProducts(result?.products)
        } catch (e) {
            toast.error(e.message)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <main className={styles.products}>
            <h2>{text.all_products}</h2>
            <ul className={styles.books}>
                {
                    products?.length > 0 ? products?.map(product => (
                        <li key={product?.id}>
                            <Card
                                href={routes.product.path.replace(':id', product?.id)}
                                image={product?.mainImage}
                                title={product?.title}
                                description={product?.subtitleShort}
                                likeCount={product?.numOfLikes}
                            />
                        </li>
                    )) : <p>{text.no_result}</p>
                }

            </ul>
        </main>
    )
}

export default Products
