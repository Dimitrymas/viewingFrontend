import navLinks from "../../consts/navLinks.js";
import {useNavigate} from "react-router-dom";
import styles from "./index.module.css";

function NavBar() {

    const navigate = useNavigate()

    const bindOnClick = (link) => {
        return () => {
            navigate(link)
        }
    }

    return (
        <div className={styles.navBar}>
            {
                navLinks.map((link, key) => {
                    return (
                        <div
                            onClick={bindOnClick(link.url)}
                            className={styles.linkContainer}
                        >
                            <span className={styles.link} key={key}>{link.title}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default NavBar;