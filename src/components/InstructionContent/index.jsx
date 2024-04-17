import styles from './index.module.css'

function InstructionContent({text, imageLinks}) {
    return (
        <div className={styles.container}>
            <span>{text}</span>
            <div className={}>
                {
                    imageLinks.map((link, key) => (
                        <div className={styles.imageContainer}>
                            <img className={styles.image} key={key} src={link} alt={"Nothing"}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default InstructionContent