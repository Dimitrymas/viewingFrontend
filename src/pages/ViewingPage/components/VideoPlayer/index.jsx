import ReactPlayer from 'react-player';
import PropTypes from "prop-types";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {FaPause, FaPlay} from "react-icons/fa";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from "./index.module.css";
import {MdOutlineFullscreen} from "react-icons/md";

const  VideoPlayer = forwardRef((props, ref)  => {
    const {currentLink, handlePause, handlePlay, handleSeek} = props
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const player = useRef(null)

    useImperativeHandle(ref, () => ({
        play: () => {
            setIsPlaying(true)
        },
        pause: () => {
            setIsPlaying(false)
        },
        setTime: (time) => {
            setCurrentTime(time)
            player.current.seekTo(time)
        }
    }))

    const handlePausePlay = () => {
        if (isPlaying) {
            handlePause(currentTime)
        } else {
            handlePlay(currentTime)
        }
    }

    const onSeek = (value) => {
        handleSeek(value)
    }

    const onProgress = (duration) => {
        setCurrentTime(duration.playedSeconds)
    }

    const handleFullScreen = async () => {
        await player.current.wrapper.requestFullscreen()
    }

    return (
        <>
            <ReactPlayer
                ref={player}
                url={currentLink}
                playing={isPlaying}
                width="100%"

                onProgress={onProgress}
                height="100%"
            />
            <div className={styles.controlContainer}>
                <button className={styles.controlPlayButton} onClick={handlePausePlay}>
                    {isPlaying ? <FaPause/> : <FaPlay/>}
                </button>
                <Slider
                    className={styles.controlSlider}
                    min={0}
                    max={player.current?.getDuration() || 0}
                    value={currentTime}
                    onChange={onSeek}/>
                <button onClick={handleFullScreen} className={styles.controlFullScreenButton}>
                    <MdOutlineFullscreen className={styles.fullScreenIcon}/>
                </button>
            </div>
        </>
    );
})

VideoPlayer.defaultProps = {
    currentLink: 'https://www.youtube.com/shorts/7VBjWPnhMIE',
    isPlaying: true
}

VideoPlayer.propTypes = {
    currentLink: PropTypes.string,
    isPlaying: PropTypes.bool,
    handleStop: PropTypes.func,
    handleStart: PropTypes.func,
    handleSeek: PropTypes.func
}

export default VideoPlayer;