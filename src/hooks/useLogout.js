import axios from "../api/axios";
import useAuth from "./useAuth";


const useLogout = () => {
    const {auth, setAuth} = useAuth()
    
    const logoutApi =  () => {
        const response =  axios.post('/account/logout',
        {},
         {
            withCredentials: true,
            headers:{
                'Authorization': `Bearer ${auth.accessToken}`
            }
        
    });
}
    const logout = async () => { 

        try {
            logoutApi();
        }
        
    
    catch(error)
    {
        console.log("logout")
        console.log(error.response);
    }
        setAuth({});
        }
      

    return logout;


}
export default useLogout;