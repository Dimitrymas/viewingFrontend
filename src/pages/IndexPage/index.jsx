import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from './index.module.css';

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
        <div className={styles.container}>
          <h1>See films with your friends</h1>
          <button className={styles.button} onClick={createRoom}>Create a room</button>
        </div>
  );
}

export default IndexPage;