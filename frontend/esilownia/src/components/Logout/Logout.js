import React from 'react';
import axiosInstance from '../Axios/axios';
import axiosZmienne from '../Axios/axiosZmienne';
import {useHistory} from 'react-router-dom';

export default function Logout() {
    const history = useHistory();

    const handleLogout = (e) => {
        axiosInstance.post('auth/revoke-token/', {
            client_id: axiosZmienne.client_id,
            client_secret: axiosZmienne.client_secret,
            token: localStorage.getItem('access_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token_type');
        axiosInstance.defaults.headers['Authorization'] = null;
        //console.log("Logout and removed tokens")
        //console.log("Token acc: " + localStorage.getItem('access_token'))
        //console.log("Token ref: " + localStorage.getItem('refresh_token'))
        history.push('/');
    };
    return <div onClick={handleLogout}>Logout</div>;
}