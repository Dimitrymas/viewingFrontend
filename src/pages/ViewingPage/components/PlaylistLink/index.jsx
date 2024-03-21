import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import {useState} from "react";

function PlaylistLink({link, handleDeleteLink}) {
    const handleClick = () => {
        handleDeleteLink(link.id);
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>{link.url}</p>
            <FaRegTrashAlt className={styles.icon} onClick={handleClick}/>
        </div>
    );
}

PlaylistLink.propTypes = {
    link: PropTypes.shape({
        url: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }),
    handleDeleteLink: PropTypes.func.isRequired
}


export default PlaylistLink;