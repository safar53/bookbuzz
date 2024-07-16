import Link from 'next/link'

import styles from './footer.module.scss'
import data from './data.json'
import text from 'src/text.json'
import {routes} from 'src/utils/routes'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Link href={routes.home.path} className={styles.company}>{text.company_name}</Link>
            <ul>
                {
                    data?.sections?.map((section, index) => (
                        <li key={index}>
                            {section?.name && <h5>{section?.name}</h5>}
                            <ul>
                                {
                                    section?.sub_items?.map(sub => (
                                        <li key={sub.name + sub?.url}>
                                            <Link href={sub?.url}>
                                                {sub?.name}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </footer>
    )
}

export default Footer
