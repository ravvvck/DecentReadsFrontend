import {Outlet} from 'react-router-dom'
import {useState, useEffect} from 'react'
import useRefreshToken  from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from "@mui/material";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {auth} = useAuth();
    const refresh = useRefreshToken()
    function getCookie(name)
    {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    useEffect(()=> {
        
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        }
    

        (!auth?.accessToken && getCookie('refreshTokenExist')=='true') ? verifyRefreshToken() : setIsLoading(false);
    },[])

    


  return (
    <div>
        
    {isLoading ?
     <Grid container spacing={0} direction="column" sx={{paddingTop:'350px'}}
     alignItems="center"
     justifyContent="center"> <CircularProgress /> </Grid> : <Outlet />}
        <br/>
    
    </div>
  )
}

export default PersistLogin