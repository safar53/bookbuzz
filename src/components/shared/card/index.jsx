import Link from 'next/link'
import Image from 'next/image'
import {FaHeart} from 'react-icons/fa'

import styles from './card.module.scss'
import {shortenText} from 'src/utils/text'

const Card = ({
    href,
    image,
    title,
    description,
    likeCount
}) => {
    return (
        <Link
            className={styles.card}
            href={href}
        >
            <Image
                src={image}
                width={200}
                height={200}
                alt={title}
            />
            <div>
                <h3>{title}</h3>
                <p>{shortenText(description, 60)}</p>
                <span>
                    <FaHeart />
                    {likeCount}
                </span>
            </div>
        </Link>
    )
}

export default Card
