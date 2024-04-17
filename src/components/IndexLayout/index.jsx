import NavBar from "../NavBar/index.jsx";
import styles from "./index.module.css";

function IndexLayout({children}) {
    return (
        <>
            <NavBar/>
            <div className={styles.mainContent}>
                {children}
            </div>
        </>
    );
}

export default IndexLayout;