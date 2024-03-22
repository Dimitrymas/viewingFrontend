import PropTypes from "prop-types";
import styles from "./index.module.css"
import {VscNewline} from "react-icons/vsc";
import PlaylistLink from "../PlaylistLink/index.jsx";
import {useState} from "react";

function Playlist({links, handleCreate, handleDeleteLink, handleChoiceLink}) {
    const [input, setInput] = useState("")

    const onChange = (e) => {
        setInput(e.target.value)
    }

    const onClick = () => {
        if (input) {
            handleCreate(input)
            setInput('')
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>Write link to a video here</p>
            <form className={styles.form}>
                <input value={input} onChange={onChange} className={styles.formInput}/>
                <VscNewline onClick={onClick} className={styles.formIcon}/>
            </form>
            <div className={styles.linksContainer}>
                {
                    links.map((link, index) =>
                        <PlaylistLink
                            handleDeleteLink={handleDeleteLink}
                            key={index}
                            link={link}
                            handleChoiceLink={handleChoiceLink}
                        />
                    )
                }
            </div>
        </div>
    )
}

Playlist.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape(
            {
                id: PropTypes.string,
                url: PropTypes.string
            }
        )
    ).isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleDeleteLink: PropTypes.func.isRequired,
    handleChoiceLink: PropTypes.func.isRequired
}


export default Playlist;