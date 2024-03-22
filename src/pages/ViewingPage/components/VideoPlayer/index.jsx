import ReactPlayer from 'react-player';
import PropTypes from "prop-types";
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {FaPause, FaPlay} from "react-icons/fa";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from "./index.module.css";
import {MdOutlineFullscreen} from "react-icons/md";

// eslint-disable-next-line react/display-name
const VideoPlayer = forwardRef((props, ref) => {
    const {currentLink, handlePause, handlePlay, handleSeek, handleEnd} = props
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


    useEffect(() => {
        if (currentTime === player.current?.getDuration()) {
            handleEnd()
        }
    }, [currentTime]);


    return (
        <>
            {currentLink &&
                <>
                    <ReactPlayer
                        ref={player}
                        url={currentLink}
                        playing={isPlaying}
                        width="100%"
                        onProgress={onProgress}
                        // height="100%"
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
            }
        </>
    );
})


VideoPlayer.propTypes = {
    currentLink: PropTypes.string,
    isPlaying: PropTypes.bool,
    handlePause: PropTypes.func,
    handlePlay: PropTypes.func,
    handleSeek: PropTypes.func
}

export default VideoPlayer;