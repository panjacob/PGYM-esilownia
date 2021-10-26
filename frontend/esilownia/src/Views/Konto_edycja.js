import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DaneKontaEdycja from '../components/KontoEdycja/Dane_konto_edycja'
import KontoZmianaHasla from '../components/KontoEdycja/Konto_zmiana_hasla'

function KontoEdycja() {

    return (
        <div className="konto_edycja">
            <div className="container">

                <DaneKontaEdycja></DaneKontaEdycja>

                <KontoZmianaHasla></KontoZmianaHasla>

            </div>
        </div>
    );
}

export default KontoEdycja;