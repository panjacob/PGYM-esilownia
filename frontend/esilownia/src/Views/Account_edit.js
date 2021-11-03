import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DaneKontaEdycja from '../components/Account_Edit/Account_Edit_data_edit'
import KontoZmianaHasla from '../components/Account_Edit/Account_Edit_password_change'
import KontoZmianaZdjecia from "../components/Account_Edit/Account_Edit_photo_change";

function KontoEdycja() {

    return (
        <div className="account_edit">
            <div className="container">

                <KontoZmianaZdjecia></KontoZmianaZdjecia>
                <DaneKontaEdycja></DaneKontaEdycja>
                <KontoZmianaHasla></KontoZmianaHasla>

            </div>
        </div>
    );
}

export default KontoEdycja;