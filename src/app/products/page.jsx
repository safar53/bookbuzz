'use client'

import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'

import styles from './page.module.scss'
import text from 'src/text.json'
import {routes} from 'src/utils/routes'
import ProductService from 'src/api/product'
import Card from 'src/components/shared/card'
import Loader from 'src/components/layout/Loader'

const Products = () => {
    const [products, setProducts] = useState([])
    const [showLoader, setShowLoader] = useState(true)

    const getProducts = async() => {
        setShowLoader(true)
        try {
            const {data} = await ProductService.getProducts()
            setProducts(data?.result?.products)
            setShowLoader(false)
        } catch (e) {
            toast.error(e.message)
            setShowLoader(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <main className={styles.products}>
            {
                showLoader ? <Loader /> :
                    <>
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
                    </>
            }
        </main>
    )
}

export default Products
