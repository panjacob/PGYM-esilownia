import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Opis_cennik() {
    return (
        <div id="opis-cennik" className="container p-5 font-weight-light rounded-pill">
            <div className="row text-center">
                <div className="col-sm my-auto">
                    <hr width="80%" color="black"/>
                    Gymcoin to nasza wirtualna waluta,
                    pozwala na kupowanie treningów od trenerów.
                    <hr width="80%" color="black"/>
                </div>
                <div className="col-sm my-auto">
                    <hr width="80%" color="black"/>
                    Gymcoiny pozwalaja ci uniknać ciaglych płatności przy kazdym zakupie.
                    <hr width="80%" color="black"/>
                </div>
                <div className="col-sm my-auto">
                    <hr width="80%" color="black"/>
                    Jedyne co robisz to dołodowujesz konto i bezproblemowo nabywasz treningi i diety.
                    <hr width="80%" color="black"/>
                </div>
            </div>
        </div>
    );
}

export default Opis_cennik;