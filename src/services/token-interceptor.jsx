import axios from "axios";
import { environment } from "../environment/environment";

const instance = axios.create({
    baseURL: `${environment.baseurl}`
});

instance.interceptors.request.use(
    async config => {
        const authToken = localStorage.getItem('authToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (authToken && refreshToken && authToken !== undefined) {
           
                config.params = config.params || {};
                config.headers['Authorization'] = `Bearer ${authToken}`;  
          
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

let isRefreshing = false; // Track the refresh status
let requestsQueue = []; // Store queued requests

const processQueue = (error, token = null) => {
    requestsQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    requestsQueue = []; // Clear the queue
};

instance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                const refreshToken = localStorage.getItem('refreshToken');
                return refreshAccessToken(refreshToken)
                    .then(newAccessToken => {
                        if (newAccessToken) {
                            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                            processQueue(null, newAccessToken); // Resolve queued requests with the new token
                            return instance(originalRequest);
                        }
                    })
                    .catch(err => {
                        processQueue(err, null); // Reject queued requests
                        return Promise.reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false; // Reset the refresh status
                    });
            } else {
                // Return a promise that resolves when the current refresh completes
                return new Promise((resolve, reject) => {
                    requestsQueue.push({resolve, reject});
                })
                .then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return instance(originalRequest);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
            }
        } else if (error.response?.status === 403 && environment.production) {
            window.location.href = '/unauthorized';
        } else if (error?.message === 'Network Error' && environment.production){
            window.location.href = '/network-error'

        } 
        // 
        return Promise.reject(error);
    }
);
async function refreshAccessToken(refresh) {
    try {
        const response = await axios.post(`${environment.baseurl}/auth/token/refresh/`, { refresh });
        // 
        const { access } = response.data;
        // 
        // Store the new access token
        localStorage.setItem("authToken", access)

        return access;
    } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth'

        // Handle error, e.g., redirect to login if the refresh token is invalid
        return null;
    }
}

export default instance;