import styles from './Alert.module.css'

type AlertProps = {
    alert: string
}

export default function Alert({
    alert
}: AlertProps) {

    return(
        <div className={styles.alert}>
            {alert}
        </div>
    )
}