import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './globals.scss'
import CustomProvider from 'src/components/Provider'

export const metadata = {
    title: 'Book Buzz',
    description: 'Book Buzz'
}

const ALERT_DURATION = 3000

const RootLayout = ({children}) => {
    return (
        <html lang="en">
            <body>
                <ToastContainer position="bottom-right" autoClose={ALERT_DURATION}/>
                <CustomProvider>
                    {children}
                </CustomProvider>
            </body>
        </html>
    )
}

export default RootLayout
