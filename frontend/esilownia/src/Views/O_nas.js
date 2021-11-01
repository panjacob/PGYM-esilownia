import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CechyONas from "../components/O_nas/Cechy_o_nas";
import OpisONas from "../components/O_nas/Opis_o_nas";
import Kontakt from "../components/O_nas/Kontakt_o_nas";

function O_nas() {
    return (
        <div className="o_nas pb-5">
            <div className="container" >
                <OpisONas></OpisONas>
            </div>
            <div className="container">
                <CechyONas></CechyONas>
            </div>
            <div className="container">
                <Kontakt></Kontakt>
            </div>
        </div>
    );
}

export default O_nas;