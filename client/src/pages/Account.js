import React from "react";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Auth from '../utils/auth.js';
import Box from '@mui/material/Box';

const Home = () => {

  const logout = (event) => {
    event.preventDefault();
    console.log(Auth.loggedIn())
    Auth.logout();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pl: 1, pb: 1 }}>
      <Box>
        <h1>Account</h1>
      </Box>
      <Box>
        {
          Auth.loggedIn()
            ? <Button variant="outlined" onClick={logout}>Logout</Button>
            : <Link href="/sign-in" variant="body2">
              <Button variant="contained">Login</Button>
            </Link>
        }
      </Box>
    </Box>
  );
};

export default Home;