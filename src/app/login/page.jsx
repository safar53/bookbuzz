'use client'

import {useState} from 'react'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

import styles from './page.module.scss'
import {loginSchema} from 'src/utils/validation'
import Input from 'src/components/shared/input'
import Button from 'src/components/shared/button'
import text from 'src/text.json'
import BookBuzzImg from 'src/assets/images/bookbuzz-login.png'
import {routes} from 'src/utils/routes'
import {filterAndCombine} from 'src/utils/array'
import localStorageManager from 'src/utils/localStorage'
import {setCartItems} from 'src/store/header/headerSlice'
import AuthService from 'src/api/auth'

const fieldNames = {
    email: 'email',
    password: 'password'
}

const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const login = async data => {
        setIsLoaderActive(true)
        try {
            const {result} = await AuthService.login(data)
            localStorage.setItem('token', result?.jwt)
            await dispatch(setCartItems(filterAndCombine(localStorageManager.get('desired'))))
            await localStorageManager.set('cart', localStorageManager.get('desired'))
            localStorage.removeItem('desired')
            router.push(routes.cart.path)
        } catch (e) {
            toast.error(e.message)
        }
        setIsLoaderActive(false)
    }

    const formik = useFormik({
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: loginSchema,
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: login
    })
    return (
        <main className={styles.login}>
            <div className={styles.imageContainer}>
                <Image
                    src={BookBuzzImg}
                    width={400}
                    height={400}
                    alt="BookBuzz"
                />
            </div>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <h1 className={styles.formHeader}>{text.login}</h1>
                <div className={styles.formElements}>
                    <Input
                        type="text"
                        name={fieldNames.email}
                        placeholder={text.email}
                        label={text.email}
                        value={formik.values.email}
                        error={formik.errors.email}
                        onChange={formik.handleChange}
                        icon={<MdEmail/>}
                    />
                    <Input
                        type={isPasswordVisible ? 'text' : 'password'}
                        name={fieldNames.password}
                        placeholder={text.password}
                        label={text.password}
                        value={formik.values.password}
                        error={formik.errors.password}
                        onChange={formik.handleChange}
                        icon={isPasswordVisible ? <FaEyeSlash/> : <FaEye/>}
                        onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                    <Button
                        disabled={isLoaderActive}
                    >
                        <span>{text.login}</span>
                    </Button>
                </div>
            </form>
        </main>
    )
}

export default Login
