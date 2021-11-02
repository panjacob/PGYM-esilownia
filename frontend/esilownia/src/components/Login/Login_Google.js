import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleLogin from 'react-google-login';
import axiosInstance from '../Axios/axios';
import { useHistory } from 'react-router-dom';
import axiosZmienne from "../Axios/axiosZmienne";

function Google_login() {

    const history = useHistory();

    const googleLogin = (accesstoken) => {
        console.log(accesstoken);
        axiosInstance
            .post('auth/convert-token', {
                token: accesstoken,
                backend: 'google',
                grant_type: 'convert_token',
                client_id: axiosZmienne.client_id,
                client_secret: axiosZmienne.client_secret,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                localStorage.setItem('token_type', res.data.token_type);

                history.push('/dashboard');
                window.location.reload();
            });
    };

    const responseGoogle = (response) => {
        console.log(response);
        //googleLogin(response.accessToken);
    }

    return (
        <div className="google_login">
            <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

export default Google_login;