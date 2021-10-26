import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Opis_cennik() {
    return (
        <div id="opis-cennik" className="container p-5 font-weight-light rounded-pill">
            <div className="row text-center">
                <div className="col-md my-auto">
                    <hr width="80%" />
                    Gymcoin to nasza wirtualna waluta,
                    pozwala na kupowanie treningów od trenerów.
                    <hr width="80%" />
                </div>
                <div className="col-md my-auto">
                    <hr width="80%" />
                    Gymcoiny pozwalaja ci uniknać ciaglych płatności przy kazdym zakupie.
                    <hr width="80%" />
                </div>
                <div className="col-md my-auto">
                    <hr width="80%" />
                    Jedyne co robisz to dołodowujesz konto i bezproblemowo nabywasz treningi i diety.
                    <hr width="80%" />
                </div>
            </div>
        </div>
    );
}

export default Opis_cennik;