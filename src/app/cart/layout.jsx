import DefaultLayout from 'src/components/layout/DefaultLayout'

export const metadata = {
    title: 'BookBuzzCart',
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
