import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleLogin from 'react-google-login';
import axiosInstance from '../Axios/Axios';
import {useHistory} from 'react-router-dom';
import axios_variebles from "../Axios/Axios_variebles";

function Google_login() {

    const history = useHistory();

    const googleLogin = (accesstoken) => {

        axiosInstance
            .post('auth/convert-token', {
                token: accesstoken,
                backend: 'google-oauth2',
                grant_type: 'convert_token',
                client_id: axios_variebles.client_id_google,
                client_secret: axios_variebles.client_secret_google,
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
        googleLogin(response.accessToken);
    }

    return (
        <div className="google_login">

            <GoogleLogin
                clientId="184998521093-72jv3431tpjsrgfb1icl3qftpqda7e8j.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />

        </div>
    );
}

export default Google_login;