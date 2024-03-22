import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./index.module.css";
import PropTypes from "prop-types";

function PlaylistLink({link, handleDeleteLink, handleChoiceLink}) {
    const handleClick = () => {
        handleDeleteLink(link.id);
    }

    const handleChoice = () => {
        handleChoiceLink(link.id);
    }



    return (
        <div className={ link.is_playing ? styles.activeContainer : styles.container}>
            <p onClick={handleChoice} className={styles.title}>{link.url}</p>
            <FaRegTrashAlt className={styles.icon} onClick={handleClick}/>
        </div>
    );
}

PlaylistLink.propTypes = {
    link: PropTypes.shape({
        url: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        is_playing: PropTypes.bool.isRequired
    }),
    handleChoiceLink: PropTypes.func.isRequired,
    handleDeleteLink: PropTypes.func.isRequired
}


export default PlaylistLink;