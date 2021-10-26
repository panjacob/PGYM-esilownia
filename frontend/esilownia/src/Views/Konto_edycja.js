import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DaneKontaEdycja from '../components/KontoEdycja/Dane_konto_edycja'
import KontoZmianaHasla from '../components/KontoEdycja/Konto_zmiana_hasla'
import KontoZmianaZdjecia from "../components/KontoEdycja/Konto_zmiana_zdjecia";

function KontoEdycja() {

    return (
        <div className="konto_edycja">
            <div className="container">

                <KontoZmianaZdjecia></KontoZmianaZdjecia>

                <DaneKontaEdycja></DaneKontaEdycja>

                <KontoZmianaHasla></KontoZmianaHasla>

            </div>
        </div>
    );
}

export default KontoEdycja;