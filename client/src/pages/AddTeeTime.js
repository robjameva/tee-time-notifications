import { useEffect } from "react";
import AddTeeTime from "../components/AddTeeTime";
import { useNavigate } from 'react-router-dom';
import auth from '../utils/auth'


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.loggedIn()) navigate('/');
  });

  return (
    <div className="container">
      <AddTeeTime desktop={false} />
    </div>
  );
};

export default Home;