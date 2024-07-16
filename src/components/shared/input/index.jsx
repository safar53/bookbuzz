import styles from './input.module.scss'

const Input = ({
    type = 'text',
    name,
    label,
    placeholder,
    onChange,
    value,
    error,
    icon,
    onIconClick
}) => {
    return (
        <div className={styles.container}>
            <label  className={styles.label} htmlFor={name}>{label}</label>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
                {icon !== undefined && <span onClick={onIconClick} className={styles.icon}>{icon}</span>}
            </div>
            <span className={styles.error}>{error && `* ${error}`}</span>
        </div>
    )
}

export default Input
