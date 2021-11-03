import React from 'react';
import axiosInstance from '../Axios/Axios';
import axios_variebles from '../Axios/Axios_variebles';
import {useHistory} from 'react-router-dom';

export default function Logout() {

    const history = useHistory();

    const handleLogout = (e) => {
        axiosInstance.post('auth/revoke-token/', {
            client_id: axios_variebles.client_id,
            client_secret: axios_variebles.client_secret,
            token: localStorage.getItem('access_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token_type');
        axiosInstance.defaults.headers['Authorization'] = null;

        history.push('/');
    };

    return <div onClick={handleLogout}>Logout</div>;

}