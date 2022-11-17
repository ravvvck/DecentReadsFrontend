import React from 'react'
import { Link, useNavigate  } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import SearchBar from "./SearchBar"
import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';



const Navbar = () => {
  const logout = useLogout()
  const {auth} =  useAuth();
  const navigate = useNavigate();




  const signout = () => {
    logout(); 
    navigate("/");
 
    
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
           
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '30px',
    fontFamily: 'Montserrat' }}>
            decent reads
            
          </Typography>
          <Button color="inherit" sx={{ paddingLeft: 10}} component={Link} to={'/home'}>Home</Button>
          <Button color="inherit" sx={{paddingLeft: 10}} component={Link} to={'/dashboard'}>Dashboard</Button>

          <SearchBar />
          

          {!auth?.accessToken ?   (<Button color="inherit" sx={{paddingLeft: 10}} component={Link} to={'/login'}>Login</Button> ):
           (<Button color="inherit" sx={{paddingLeft: 10}} onClick={signout}>Logout</Button>)} 
         
          
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;