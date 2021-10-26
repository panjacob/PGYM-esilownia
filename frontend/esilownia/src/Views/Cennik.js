import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import OfertaCennik from "../components/Cennik/Oferta_cennik";
import OpisCennik from "../components/Cennik/Opis_cennik";


function Cennik() {
    return (
        <div className="cennik">

            <div className="container">

                <div className="row justify-content-center my-5">

                    <div class="container text-center">
                        <h1 class="display-1 font-weight-light mb-4">Cennik</h1>
                    </div>
                    <OfertaCennik></OfertaCennik>
                </div>
                <div className="row justify-content-center my-5">

                    <div className="container text-center">
                        <h1 className="display-1 font-weight-light">Co to Gymcoin ?</h1>
                    </div>
                    <OpisCennik></OpisCennik>
                </div>
            </div>
        </div>
    );
}
export default Cennik;