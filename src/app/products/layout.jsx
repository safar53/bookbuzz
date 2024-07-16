import DefaultLayout from 'src/components/layout/DefaultLayout'

export const metadata = {
    title: 'Products',
    description: 'Book Buzz Products'
}

const ProductsLayout = ({children}) => {
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    )
}

export default ProductsLayout
