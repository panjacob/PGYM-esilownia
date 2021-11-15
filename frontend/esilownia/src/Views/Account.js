import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DaneKonto from '../components/Account/Account_data'
import ZdjecieKonto from "../components/Account/Account_photo";

function Account() {

    return (
        <div className="account">
            <div className="container">

                <ZdjecieKonto></ZdjecieKonto>
                <DaneKonto></DaneKonto>

            </div>
        </div>
    );
}

export default Account;