import React, { useEffect } from 'react';
import axiosInstance from '../Axios/axios';
import { useHistory } from 'react-router-dom';

export default function SignUp() {
    const history = useHistory();

    useEffect(() => {
        const response = axiosInstance.post('auth/revoke-token/', {
            client_id: 'TUz2wd25Z9hfRbOUr9z3CFEKAc42hJrjsz57sMt6',
            client_secret:
                'QpMCaevBW6VRJ42wtJ1Cgqitz0aVuBMJRQFgULMTGYievg572RVlcQoTD6xtaVf4mL6K38Df6tcazzfsxMfaDTEjzbH343kFCItJfJKEa2bcjL0ukufLOsfQCAFx3hTR',
            token: localStorage.getItem('refresh_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        console.log("Logout and removed tokens")
        console.log("Token : " + localStorage.getItem('refresh_token'))
        //history.push('/login');
    });
    return <div>Logout</div>;
}