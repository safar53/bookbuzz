import DefaultLayout from 'src/components/layout/DefaultLayout'

export const metadata = {
    title: 'Book Buzz Product Details',
    description: 'BookBuzz Product Details'
}

const ProductDetailsLayout = ({children}) => {
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    )
}

export default ProductDetailsLayout
