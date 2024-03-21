import {useNavigate, useParams} from "react-router-dom";
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer/index.jsx";
import Playlist from "./components/Playlist/index.jsx";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useRef, useState} from "react";

function ViewingPage() {
    const {id} = useParams();
    const [error, setError] = useState('Connecting...');
    const [shouldReconnect, setShouldReconnect] = useState(true);
    const [roomData, setRoomData] = useState({
        links: [],
        current_link: '',
        playing: false,
        current_time: 0,
        messages: [],
        id: ''
    })

    const playerRef = useRef(null)

    const navigate = useNavigate()

    const onMessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.status === 'error') {
            navigate('/')
            setError(data.message)
            setShouldReconnect(false)
        }
        setRoomData(data.data)
        if (playerRef.current) {
            if (data.data.playing) {
                playerRef.current.play()
            } else {
                playerRef.current.pause()
            }
            console.log(data.data.current_time)
            playerRef.current.setTime(data.data.current_time)
        }
    }


    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(`${import.meta.env.VITE_WS_URL}/ws/${id}`, {
        onOpen: () => {
            setError('')
            console.log('opened')
        },
        onMessage: onMessage,
        shouldReconnect: (closeEvent) => shouldReconnect,
    });

    const handleCreate = (url) => {
        console.log(url)
        sendJsonMessage({type: 'add_link', url})
    }

    const handleDeleteLink = (id) => {
        sendJsonMessage({type: 'delete_link', id})
    }

    return (
        <div>
            <Header id={id}/>
            {
                error ? (
                        <h1>{error}</h1>
                    ) :
                    (
                        <>
                            <VideoPlayer
                                ref={playerRef}
                                currentLink={roomData.current_link}
                                isPlaying={roomData.playing}
                                handlePause={(t) => sendJsonMessage({type: 'pause', time: t})}
                                handlePlay={() => sendJsonMessage({type: 'play'})}
                                handleSeek={(value) => sendJsonMessage({type: 'seek', time: value})}
                            />
                            <Playlist
                                links={roomData.links}
                                handleCreate={handleCreate}
                                handleDeleteLink={handleDeleteLink}
                            />
                        </>
                    )
            }
        </div>
    )
}

export default ViewingPage;