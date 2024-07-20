'use client'

import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {toast} from 'react-toastify'

import styles from './page.module.scss'
import text from 'src/text.json'
import {setCartItems} from 'src/store/header/headerSlice'
import localStorageManager from 'src/utils/localStorage'
import {routes} from 'src/utils/routes'
import {filterAndCombine} from 'src/utils/array'
import ProductService from 'src/api/product'
import Loader from 'src/components/layout/Loader'

const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    slidesToScroll: 1
}

const ProductDetails = ({params}) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const cartItems = useSelector((state) => state.header.cartItems)
    const id = params?.id
    const [productDetails, setProductDetails] = useState()
    const [count, setCount] = useState(1)
    const [showLoader, setShowLoader] = useState(true)

    let token
    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token')
    }

    const addToCart = () => {
        let arr = []
        for (let i = 0; i < count; i++) {
            arr.push(productDetails)
        }
        if (token) {
            dispatch(setCartItems(filterAndCombine([
                ...cartItems,
                ...arr
            ])))
            localStorageManager.set('cart', filterAndCombine([
                ...cartItems,
                ...arr
            ]))
            toast.success(`${count} ${count === 1 ? 'item' : 'items'} added to cart`)
            return
        }
        toast.success(`${count} ${count === 1 ? 'item' : 'items'} added to cart`)
        localStorageManager.set('desired', filterAndCombine(arr))
        router.push(routes.login.path)
    }

    const getProductDetails = async() => {
        setShowLoader(true)
        try {
            const {data} = await ProductService.getProductDetails(id)
            setProductDetails(data?.result)
            setShowLoader(false)
        } catch (e) {
            toast.error(e.message)
            setShowLoader(false)
        }
    }

    useEffect(() => {
        id && getProductDetails()
    }, [id])
    return (
        <main className={styles.container}>
            {
                showLoader ? <Loader /> :
                    productDetails ? <div className={styles.details}>
                        <div className={styles.images}>
                            <Image
                                className={styles.mainImage}
                                src={productDetails?.mainImage}
                                width={200}
                                height={200}
                                alt={productDetails?.title}
                            />
                            {
                                productDetails?.images?.length > 0 && <div className={styles.slider}>
                                    <Slider {...settings}>
                                        {
                                            productDetails?.images?.map((image, index) => (
                                                <Image
                                                    key={image + index}
                                                    src={image}
                                                    width={200}
                                                    height={200}
                                                    alt={productDetails?.title}
                                                />
                                            ))
                                        }
                                    </Slider>
                                </div>
                            }
                        </div>
                        <div className={styles.info}>
                            <h1>{productDetails?.title}</h1>
                            <p>{productDetails?.subtitleLong}</p>
                            {productDetails?.tags?.length > 0 && <div className={styles.tags}>
                                {
                                    productDetails?.tags?.map((tag, index) => (
                                        <span key={index} className={styles.tag}>{tag}</span>
                                    ))
                                }
                            </div>}
                            {productDetails?.authors?.length > 0 && <div className={styles.authors}>
                                {
                                    productDetails?.authors?.map((author, index) => (
                                        <div key={index} className={styles.author}>
                                            <span className={styles.authorAvatar} />
                                            <span className={styles.authorName}>{author}</span>
                                        </div>
                                    ))
                                }
                            </div>}
                            <div className={styles.priceSection}>
                                <div className={styles.count}>
                                    <span onClick={() => count > 1 ? setCount(count - 1) : setCount(1)} className={styles.signs}>-</span>
                                    <span>{count}</span>
                                    <span onClick={() => setCount(count + 1)} className={styles.signs}>+</span>
                                </div>
                                <span className={styles.price}>{`$${productDetails?.price}`}</span>
                            </div>
                            <button
                                disabled={count === 0}
                                className={styles.add_to_cart}
                                onClick={addToCart}
                            >
                                {text.add_to_cart}
                            </button>
                        </div>
                    </div> : <p className={styles.notFound}>{text.not_found}</p>
            }
        </main>
    )
}

export default ProductDetails
