import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from './index.module.css';
import NavBar from "../../components/NavBar/index.jsx";
import InstructionContent from "../../components/InstructionContent/./index.jsx";
import roomDefaultImage from "../../assets/room_default.png";

function IndexPage() {

    const navigate = useNavigate();

    const createRoom = async () => {
        console.log('create room');
        console.log(import.meta.env.BASE_API_URL)
        console.log(import.meta.env)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/create_room`)
        navigate(`/room/${response.data.id}`);
    }

    return (
        <>
            <div className={styles.header}>
                <span className={styles.headerTitle}>Watch videos and movies with friends on a distance</span>
                <button className={styles.button} onClick={createRoom}>Create a room</button>
            </div>
            <InstructionContent text={"asdfsd"} imageLinks={[roomDefaultImage]}/>
        </>
  );
}

export default IndexPage;