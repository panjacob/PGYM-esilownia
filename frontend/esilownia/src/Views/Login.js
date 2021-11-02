import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from "../components/Login/Login_form"
import LoginFb from "../components/Login/Login_Fb"
import GoogleLogin from "../components/Login/Login_Google";

function Login() {

    return (
        <div className="Login">
            <div className="container">
                <div className="row d-flex justify-content-center my-5">
                    <LoginForm></LoginForm>
                </div>
                <div className="row d-flex justify-content-center my-5">
                    <LoginFb></LoginFb>
                </div>
                <div className="row d-flex justify-content-center my-5">
                    <GoogleLogin></GoogleLogin>
                </div>
            </div>
        </div>
    );
}

export default Login;
