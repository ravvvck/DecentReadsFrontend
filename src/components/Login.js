import React, { useState, useEffect } from 'react'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const LOGIN_URL ="/account/login"
export default function LoginComponent() {

    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"

    
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    
    const [errMsg, setErrMsg] = useState('');


    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    useEffect(() => {
      const localToken = localStorage.getItem('JwtToken');
      if (localToken != null)
      {
        setAuth(localToken)
      }
  }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({username:user, password: pwd}),  
                {
                  withCredentials: true,
                    headers: {'Content-Type' : 'application/json',
                    'Access-Control-Allow-Origin': '*'}
                });
                //console.log(JSON.stringify(response?.data));
                const accessToken = response?.data;
                setAuth({user, accessToken, isLogged: true})
                setUser('');
                setPwd('');
                navigate(from, { replace: true});

        } catch (err) {
            if (!err.response) {
                setErrMsg('No server response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.response?.status ===401){
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login failed')
            }

        }
        

    }

    return (
        
      <Container component="main" maxWidth="xs" >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={(e) => setUser(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
            />

            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>

    )
}