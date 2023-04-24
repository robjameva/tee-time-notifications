import React from "react";
import AddTeeTime from "../components/AddTeeTime";
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth.loggedIn()) navigate('/');
  });

  return (
    <div className="container">
      <AddTeeTime desktop={false} />
    </div>
  );
};

export default Home;