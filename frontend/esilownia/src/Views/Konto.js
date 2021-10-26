import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DaneKonto from '../components/Konto/Dane_konto'
import ZdjecieKonto from "../components/Konto/Zdjecie_konto";

function Konto() {

    return (
        <div className="konto">
            <div className="container">

                <ZdjecieKonto></ZdjecieKonto>

                <DaneKonto></DaneKonto>

            </div>
        </div>
    );
}

export default Konto;