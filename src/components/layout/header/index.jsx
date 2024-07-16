'use client'

import {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useDebounce} from 'use-debounce'
import Link from 'next/link'
import {FaSearch, FaUser} from 'react-icons/fa'

import styles from './header.module.scss'
import data from './data.json'
import text from 'src/text.json'
import {routes} from 'src/utils/routes'
import clsx from 'clsx'
import useOnClickOutside from 'src/utils/hooks/useOutsideClick'
import {setCartItems} from 'src/store/header/headerSlice'
// import ProductService from 'src/api/product'

const checkIsCartItem = item => {
    return item?.name?.toLowerCase() === 'cart'
}

const Header = () => {
    const dispatch = useDispatch()
    const infobarRef = useRef(null)
    const inputRef = useRef(null)
    const cartItems = useSelector((state) => state.header.cartItems)
    const [searchText, setSearchText] = useState('')
    const [searchResult, setSearchResult] = useState(null)
    const [isInfobarOpen, setIsInfobarOpen] = useState(false)
    const [debounced] = useDebounce(searchText, 1000)
    const isLoggedIn = localStorage.getItem('token')

    useOnClickOutside(infobarRef, () => setIsInfobarOpen(false))
    useOnClickOutside(inputRef, () => setSearchResult(null))

    const searchProducts = async key => {
        try {
            // const {result} = await ProductService.searchProducts(key)
            const {result} = {
                isError: false,
                errorMessage: null,
                result:{
                    products:[
                        {
                            id: '678',
                            title: 'namebook12',
                            subtitleShort: 'Some subtitle test lorep ipsum Some subtitle test lorep ipsum',
                            numOfLikes: 98,
                            price: 9.99,
                            mainImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Fbook&psig=AOvVaw0mLKFLJ3T9s6ST75_1280W&ust=1687198159034000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKjsrYq1zf8CFQAAAAAdAAAAABAE'
                        },
                        {
                            id: '542',
                            title: 'namebook167',
                            subtitleShort: 'Some subtitle test lorep ipsurrm Some subtitle test lorep ipsum',
                            numOfLikes: 108,
                            price: 6.55,
                            mainImage: 'https://www.freepik.com/free-photo/front-view-three-colored-stacked-books-with-copy-space_12151845.htm#query=book&position=11&from_view=keyword&track=sph&uuid=1ec80019-5a8d-4a7b-a303-fc49261c6d32'
                        }
                    ]
                }
            }
            setSearchResult(result?.products)
        } catch (e) {
            return
        }
    }

    useEffect(() => {
        debounced && searchProducts(debounced)
    }, [debounced])

    return (
        <header className={styles.header}>
            <div className={styles.search}>
                <input
                    ref={inputRef}
                    value={searchText}
                    type='text'
                    placeholder={text.search_by}
                    onChange={e => setSearchText(e.target.value)}
                    onFocus={e => debounced && searchProducts(debounced)}
                />
                <span onClick={() => debounced && searchProducts(debounced)} className={styles.icon}>
                    <FaSearch />
                </span>
                {
                    (searchResult && searchResult?.length > 0) ? <div className={styles.result}>
                        {
                            searchResult?.map(result => (
                                <Link
                                    key={result?.id}
                                    href={routes.product.path.replace(':id', result?.id)}
                                >
                                    {result?.title}
                                </Link>
                            ))
                        }
                    </div> : (searchResult && searchResult?.length === 0) && <div className={styles.result}>
                        <p>{text.no_result}</p>
                    </div>
                }
            </div>
            <nav>
                <ul>
                    {
                        data?.menu_items?.map(item => (
                            <li
                                key={item?.path}
                                className={clsx({
                                    [styles.cart]: checkIsCartItem(item)
                                })}
                            >
                                <Link
                                    href={item?.path}
                                >
                                    {item?.name}
                                    {
                                        checkIsCartItem(item) && localStorage.getItem('token') && <small>{cartItems?.length}</small>
                                    }
                                </Link>
                            </li>
                        ))
                    }
                    {
                        isLoggedIn ?
                            <li
                                ref={infobarRef}
                                className={styles.avatar}
                                onClick={() => setIsInfobarOpen(!isInfobarOpen)}
                            >
                                <FaUser />
                                <span
                                    className={clsx({
                                        [styles.logout]: true,
                                        [styles.active]: isInfobarOpen
                                    })}
                                    onClick={() => {
                                        dispatch(setCartItems([]))
                                        localStorage.clear()
                                    }}
                                >
                                    {text.logout}
                                </span>
                            </li> :
                            <li>
                                <Link href={routes.login.path}>
                                    <span>
                                        {text.login}
                                    </span>
                                </Link>
                            </li>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header
