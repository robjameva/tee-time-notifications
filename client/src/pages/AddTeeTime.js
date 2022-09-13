import React from "react";
import AddTeeTime from "../components/AddTeeTime";

const Home = () => {
  return (
    <div className="container">
      <AddTeeTime desktop={false} />
    </div>
  );
};

export default Home;