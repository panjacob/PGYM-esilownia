import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PasswordResetForm from "../components/Password_reset/Password_reset_form";

function PasswordReset() {
    return (
        <div className="Login">
            <div className="container pb-5">
                <div className="row d-flex justify-content-center my-5">
                    <PasswordResetForm></PasswordResetForm>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;
