import ReactPlayer from 'react-player';
import PropTypes from "prop-types";
import {forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState} from "react";
import {FaPause, FaPlay} from "react-icons/fa";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from "./index.module.css";
import {MdOutlineFullscreen} from "react-icons/md";
import Switch from "react-switch";

// eslint-disable-next-line react/display-name
const VideoPlayer = forwardRef((props, ref) => {
    const {currentLink, handlePause, handlePlay, handleSeek, handleEnd} = props
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const player = useRef(null)
    const [checked, setChecked] = useState(null)

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

    useLayoutEffect(() => {
        if (checked === null) {
            console.log( Boolean(Number(localStorage.getItem('checked'))))
            console.log(localStorage.getItem('checked'))
            const isChecked = Boolean(Number(localStorage.getItem('checked')))
            setChecked(isChecked)
        } else {
            localStorage.setItem('checked', checked ? 1 : 0)
        }
    }, [checked,])

    const onSwitchChange = (checked) => {
        setChecked(checked)
    }

    return (
        <>
            {currentLink &&
                <>
                    <ReactPlayer
                        ref={player}
                        url={currentLink}
                        playing={isPlaying}
                        width="100%"
                        onEnded={handleEnd}
                        onProgress={onProgress}
                        controls={checked}
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

                        <Switch
                            height={20}
                            width={50}
                            checkedIcon={false}
                            onColor={'#37083f'}
                            offColor={'#1c1c1c'}
                            onChange={onSwitchChange}
                            checked={checked}
                            className={styles.controlSwitch}
                        />

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