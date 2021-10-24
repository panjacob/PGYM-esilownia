import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Oferta_cennik from "../components/Cennik/Oferta_cennik";
import bg_img from "../imgs/bg-silownia.jpeg"
import Opis_cennik from "../components/Cennik/Opis_cennik";


function Cennik() {
    return (
        <div className="cennik">

            <div className="container">

                {/* <img src={bg_img} alt="Bg_Img" width="100%" class="pt-3"/> */}
                <div className="row justify-content-center my-5">

                    <div class="container text-center">
                        <h1 class="display-1 font-weight-light mb-4">Cennik</h1>
                    </div>
                    <Oferta_cennik></Oferta_cennik>
                </div>
                <div className="row justify-content-center my-5">

                    <div className="container text-center">
                        <h1 className="display-1 font-weight-light">Co to Gymcoin ?</h1>
                    </div>
                    <Opis_cennik></Opis_cennik>
                </div>
            </div>
        </div>
    );
}
export default Cennik;