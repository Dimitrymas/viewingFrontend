import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function IndexPage() {

    const navigate = useNavigate();

    const createRoom = async () => {
        const response = await axios.get(`${import.meta.env.BASE_API_URL}/create_room`)
        navigate(`/room/${response.data.id}`);
    }

    return (
        <div>
          <h1>See films with your friends</h1>
          <button onClick={createRoom}>Create a room</button>
        </div>
  );
}

export default IndexPage;