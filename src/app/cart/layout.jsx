import DefaultLayout from 'src/components/layout/DefaultLayout'

export const metadata = {
    title: 'BookBuzz Cart',
    description: 'BookBuzz Cart'
}

const CartLayout = ({children}) => {
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    )
}

export default CartLayout
