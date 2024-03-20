import PropTypes from "prop-types";
import styles from "./index.module.css";

function Header({id}) {
    const copyLink = async () => {
        await navigator.clipboard.writeText(`${window.location.origin}/room/${id}`);
    }
    return (
        <div className={styles.container}>
            <p className={styles.title}>Share this link to view movies with friends</p>
            <button className={styles.button} onClick={copyLink}>Copy link</button>
        </div>
    );
}

Header.propTypes = {
    id: PropTypes.string.isRequired
}

export default Header;