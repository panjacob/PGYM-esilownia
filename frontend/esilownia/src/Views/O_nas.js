import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CechyONas from "../components/O_nas/Cechy_o_nas";
import OpisONas from "../components/O_nas/Opis_o_nas";

function O_nas() {
    return (
        <div className="o_nas pb-5">
            <div class="container" >
                <OpisONas></OpisONas>
            </div>
            <div className="container">
                <CechyONas></CechyONas>
            </div>
        </div>
    );
}

export default O_nas;