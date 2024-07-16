import styles from './button.module.scss'

const Button = ({
    onClick,
    children,
    disabled
}) => {
    return (
        <button
            type='submit'
            className={styles.button}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
