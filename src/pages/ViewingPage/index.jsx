import {useParams} from "react-router-dom";
import Header from "./components/Header.jsx";
import VideoPlayer from "./VideoPlayer/index.jsx";

function ViewingPage() {
    const {id} = useParams();
    return (
        <div>
            <Header id={id}/>
            <VideoPlayer/>
            <h1>Room {id}</h1>
        </div>
    )
}

export default ViewingPage;