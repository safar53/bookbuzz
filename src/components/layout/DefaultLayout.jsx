import Header from 'src/components/layout/header'
import Footer from 'src/components/layout/footer'

const DefaultLayout = ({children}) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default DefaultLayout
