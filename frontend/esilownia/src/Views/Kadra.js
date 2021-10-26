import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Karuzela_kadra from "../components/Kadra/Carousel_trenerzy";
import Karuzela_dietetycy from "../components/Kadra/Carousel_dietetycy";

function Kadra() {
    return (
        <div className="kadra">
            <div className="container pt-4 align-items-center text-center">
                <h1 className="display-1">Poznaj naszą kadrę!</h1>
                <h1 className="font-weight-light pt-4 pb-4">Nasi Trenerzy</h1>
                <Karuzela_kadra></Karuzela_kadra>
                <h1 className="font-weight-light pt-4 pb-4">Nasi Dietetycy</h1>
                <Karuzela_dietetycy></Karuzela_dietetycy>
            </div>
        </div>
    );
}

export default Kadra;