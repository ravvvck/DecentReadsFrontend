import  {React, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from '../api/axios';


export default function SignUp() {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState([]);
    const [succesfulRegistration, setSuccesfulRegistration] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const data = new FormData(event.currentTarget);
        const response = await axios.post('/account/register', 
            JSON.stringify({
                email:data.get('email'),
                username: data.get('username'),
                 password: data.get('password'),
                 confirmpassword: data.get('confirmpassword')

            }),  
            {
              withCredentials: true,
                headers: {'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin': '*'}
            });
        
           
            
            if (response?.status === 200)
            {
                console.log('success')
                setSuccesfulRegistration(true);

            }

    } catch (err) {
        if( err.response){
            console.log('status',err.response.status)
            let arr = err.response.data.errors;  
            setErrMsg(Object.values(arr)) 
            
        }
    }
  };

  return (
    
      <Container component="main" maxWidth="xs">
        {succesfulRegistration ? 
        <Grid container spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center" >
            <Typography component="h1" variant="h5" sx={{paddingTop:'250px'}}>
    Registration complited <br/>
    <Link href="login" variant="body2" >
                  {"Go to login page"}
                </Link>
                
  </Typography> </Grid>:
  <>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          
            {errMsg.map((err)=>  <Typography component="h6" variant="h6" color="red">{err} </Typography>)}
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={(e) => setUser(e.target.value)}
                  error={user !== "" && (user.length <3 | user.length > 25)}
                  helperText={user !=="" && (user.length <3 | user.length > 25) ? 'Username must be between 3 and 25 characters long' : ''}
                />
              </Grid>
              
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  error={email !== "" && !email.match(
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)}
                  helperText={email !=="" && (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) ? 'Wrong email' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={pwd !== "" && (pwd.length <3 | pwd.length > 25)}
                  helperText={pwd !=="" && (pwd.length <3 | pwd.length > 25) ? 'Password is too weak' : ''}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm password"
                  type="password"
                  id="confirmpassword"
                  error={confirmPwd !== "" && confirmPwd !== pwd}
                  helperText={confirmPwd !== "" && confirmPwd !== pwd ? 'Passwords must be the same' : ''}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                />
              </Grid>

              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </>}
      </Container>
  );
}