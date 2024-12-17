// import axios from 'axios'
import { toast } from 'react-toastify';
// import { environment } from '../environment/environment';
import instance from "./token-interceptor";

export const LoggedIn = (inputdata) => {    
    return new Promise((resolve, reject) => {
        instance.post(`/auth/login/`, inputdata)
            .then((res) => {               
                localStorage.setItem("authToken", res.data['access'])
                localStorage.setItem("refreshToken", res.data['refresh'])
                localStorage.setItem("user", JSON.stringify(res.data['user'])) 
                resolve();
            })
            .catch((err) => { 
                console.log(err);
                
                toast.error( "Couldn't login" , {   
                    position:"top-right",
                    autoClose:2500,
                    hideProgressBar:false,
                    closeOnClick:true,
                    pauseOnHover:false,
                    draggable:false,
                    theme:"colored"
                })
                reject(err)
            });
    });
};

export const getUserDetails = () => {
    const token = localStorage.getItem("authToken");
    const details = JSON.parse(atob(token.split('.')[1]));    
    return details;
}

export const isLoggedIn = async () => {
    let isAuthenticated = false;
    const authToken = localStorage.getItem("authToken")

    isAuthenticated = !!authToken
    return isAuthenticated
}

export const LoggedOut = async (navigate) => {
    const isAuthenticated = await isLoggedIn()

    if (isAuthenticated) {
        localStorage.clear()
        toast.warning("Logged Out", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",

        })
        setTimeout(() => {
            navigate('/auth')
        }, 1400);
    }
}