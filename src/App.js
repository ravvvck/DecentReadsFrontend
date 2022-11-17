import React from 'react';
import './App.css';
import BookCard from './components/BookCard'
import Navbar from './components/Navbar'
import RequireAuth from './components/RequireAuth'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./components/Login"
import Layout from "./components/Layout"
import Dashboard from './components/Dashboard'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PersistLogin from './components/PersistLogin';
import LandingPage from './components/LandingPage';
import SignUp from './components/Signup';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Container className='main--container' >
      <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>
        <Route path="/home" element={<LandingPage />} />


        <Route path="bookcard/:bookId" element={<Grid container spacing={5}>
              <BookCard />
            </Grid>}>

            <Route path=":bookId" element={<Grid container spacing={5}>
              <BookCard />
            </Grid>}></Route>
            </Route>
        
           
        <Route path="login" element={<Login />}></Route> 
        <Route path="signup" element={<SignUp />}></Route> 

        {/* --- PROTECTED ROUTES --- */}
            
              <Route element={<RequireAuth />}>
                <Route path="dashboard/" element={<Dashboard />}></Route>
              </Route>
            
          </Route>
          </Route>

        </Routes>
        </Container>
      
     
    </div>
  );
}

export default App;
