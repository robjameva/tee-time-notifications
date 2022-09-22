import React from "react";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Auth from '../utils/auth.js';

const Home = () => {

  const logout = (event) => {
    event.preventDefault();
    console.log(Auth.loggedIn())
    Auth.logout();
  };

  return (
    <div className="container">
      <h1>Account</h1>

      {
        Auth.loggedIn()
          ? <Button variant="outlined" onClick={logout}>Logout</Button>
          : <Link href="/sign-in" variant="body2">
            <Button variant="contained">Login</Button>
          </Link>
      }






    </div>
  );
};

export default Home;