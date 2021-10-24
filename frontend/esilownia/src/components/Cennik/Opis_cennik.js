import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Opis_cennik() {
    return (
        <div id="opis-cennik" className="container p-5 font-weight-light ">
            <div className="row text-center">
                <div className="col-sm">
                    Gymcoin to nasza wirtualna waluta,
                    pozwala na kupowanie treningów od trenerów.
                </div>
                <div className="col-sm">
                    Żeby uniknąć ciągłych płatności za treningi możesz płacić za nie Gymcoinami!
                </div>
                <div className="col-sm">
                    Każdy trener sam ustala swoje ceny na uczestniczenie w treningach.
                </div>
            </div>
        </div>
    );
}

export default Opis_cennik;