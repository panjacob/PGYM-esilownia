import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import FbLogin from 'react-facebook-login';
import axiosInstance from '../Axios/axios';
import {useHistory} from 'react-router-dom';
import axiosZmienne from "../Axios/axiosZmienne";

function Fb_login() {

    const history = useHistory();

    const facebookLogin = (accesstoken) => {

        axiosInstance
            .post('auth/convert-token', {
                token: accesstoken,
                backend: 'facebook',
                grant_type: 'convert_token',
                client_id: axiosZmienne.client_id_fb,
                client_secret: axiosZmienne.client_secret_fb,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                localStorage.setItem('token_type', res.data.token_type);

                history.push('/dashboard');
                window.location.reload();
            });
    };

    const responseFacebook = async (response) => {
        facebookLogin(response.accessToken);
    };

    return (
        <div className="fb_login">

            <FbLogin
                appId="412879967053238"
                fields="id, name, email"
                callback={responseFacebook}
            />

        </div>
    );
}

export default Fb_login;