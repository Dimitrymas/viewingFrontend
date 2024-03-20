import ReactPlayer from 'react-player';
import PropTypes from "prop-types";
import {useRef} from "react";

function VideoPlayer({currentLink, isPlaying, handleStop, handleStart, handleSeek}) {
    return (
        <ReactPlayer
            onPlay={handleStart}
            onPause={handleStop}
            onSeek={handleSeek}
            url={currentLink}
            playing={isPlaying}
            controls
            width="100%"
            height="100%"
        />
    );
}

VideoPlayer.defaultProps = {
    currentLink: 'https://www.youtube.com/shorts/7VBjWPnhMIE',
    isPlaying: true
}

VideoPlayer.propTypes = {
    currentLink: PropTypes.string,
    isPlaying: PropTypes.bool
}

export default VideoPlayer;