import axios from 'axios';
import axiosZmienne from "./axiosZmienne";

const baseURL = 'http://127.0.0.1:8000/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        //Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        //const originalRequest = error.config;

        if (typeof error.response === 'undefined') {
            alert(
                'A server/network error occurred. ' +
                'Looks like CORS might be the problem. ' +
                'Sorry about this - we will get it fixed shortly.'
            );
            return Promise.reject(error);
        }


        if (error.response.status === 401 && window.location.href.split("/").pop() !== 'login') {
            const timeout_id = setTimeout(() => {
                if (error.response.status === 401 || error.response.status === 400) {
                    alert(
                        'Authentication Failed. ' +
                        "Please Login again. "
                    );
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.removeItem('token_type');
                    window.location.href = '/login';
                }
            }, 2000);

            axiosInstance
                .post(`auth/token/`, {
                    grant_type: 'refresh_token',
                    refresh_token: localStorage.getItem('refresh_token'),
                    client_id: axiosZmienne.client_id,
                    client_secret: axiosZmienne.client_secret,
                })
                .then((res) => {

                    window.clearTimeout(timeout_id);

                    console.log(res)
                    console.log(res.data)
                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('refresh_token', res.data.refresh_token);
                    localStorage.setItem('token_type', res.data.token_type);


                    window.location.reload();
                });


            return Promise.reject(error);
        }

        // if (
        //     error.response.status === 401 &&
        //     originalRequest.url === baseURL + 'auth/token/'
        // ) {
        //     window.location.href = '/login/';
        //     return Promise.reject(error);
        // }
        //
        // if (
        //     error.response.data.code === 'token_not_valid' &&
        //     error.response.status === 401 &&
        //     error.response.statusText === 'Unauthorized'
        // ) {
        //     const refreshToken = localStorage.getItem('refresh_token');
        //
        //     if (refreshToken) {
        //         const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
        //
        //         // exp date in token is expressed in seconds, while now() returns milliseconds:
        //         const now = Math.ceil(Date.now() / 1000);
        //         console.log(tokenParts.exp);
        //
        //         if (tokenParts.exp > now) {
        //             return axiosInstance
        //                 .post('auth/token/', {
        //                     refresh: refreshToken,
        //                 })
        //                 .then((response) => {
        //                     localStorage.setItem('access_token', response.data.access);
        //                     localStorage.setItem('refresh_token', response.data.refresh);
        //
        //                     axiosInstance.defaults.headers['Authorization'] =
        //                         'JWT ' + response.data.access;
        //                     originalRequest.headers['Authorization'] =
        //                         'JWT ' + response.data.access;
        //
        //                     return axiosInstance(originalRequest);
        //                 })
        //                 .catch((err) => {
        //                     console.log(err);
        //                 });
        //         } else {
        //             console.log('Refresh token is expired', tokenParts.exp, now);
        //             window.location.href = '/login/';
        //         }
        //     } else {
        //         console.log('Refresh token not available.');
        //         window.location.href = '/login/';
        //     }
        // }

        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);

export default axiosInstance;