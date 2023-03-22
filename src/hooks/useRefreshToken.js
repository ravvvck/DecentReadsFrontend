import axios from '../api/axios'
import useAuth from './useAuth'
import jwt_decode from "jwt-decode";

const useRefreshToken = () => {
    const {setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/account/refresh',
         {
            withCredentials: true,
            headers:{
                'Content-Type' : 'application/json'
            }
        
    });
    console.log("refresh: ",response.data)
    var decoded = jwt_decode(response.data.token);
    var username = Object.values(decoded)[1];
    setAuth(prev => {
        return {...prev, accessToken: response.data.token, isLogged: true, user: username}
    });
    return response.data.accessToken;
}
  return (
    refresh
  )
}

export default useRefreshToken