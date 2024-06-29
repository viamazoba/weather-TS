import styles from './Spinner.module.css'

export default function Spinner() {
    return (
        <div className={styles.container}>
            <div className={styles.skchase}>
                <div className={styles.skchaseDot}></div>
                <div className={styles.skchaseDot}></div>
                <div className={styles.skchaseDot}></div>
                <div className={styles.skchaseDot}></div>
                <div className={styles.skchaseDot}></div>
                <div className={styles.skchaseDot}></div>
            </div>
        </div>
    )
}