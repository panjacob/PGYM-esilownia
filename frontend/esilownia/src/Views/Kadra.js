import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Karuzela_kadra from "../components/Kadra/Carousel_trenerzy";
import Karuzela_dietetycy from "../components/Kadra/Carousel_dietetycy";
import Trenerzy from "../components/Kadra/Trenerzy";
import Dietetycy from "../components/Kadra/Dietetycy";

function Kadra() {
    return (
        <div className="kadra">
            <div className="container pt-4 align-items-center text-center">
                <h1 className="display-1"><i>Poznaj naszą kadrę !</i></h1>

                <hr></hr>
                <h1 className="font-weight-light pt-4 pb-4"><i>Nasi Trenerzy</i></h1>
                <hr></hr>
                <Trenerzy></Trenerzy>
                <Trenerzy></Trenerzy>
                <hr></hr>

                <h1 className="font-weight-light pt-4 pb-4">Wybierz z kim chcesz trenowac !</h1>
                <Karuzela_kadra></Karuzela_kadra>

                <hr></hr>
                <h1 className="font-weight-light pt-4 pb-4"><i>Nasi Dietetycy</i></h1>
                <hr></hr>
                <Dietetycy></Dietetycy>
                <hr></hr>

                <h1 className="font-weight-light pt-4 pb-4">Wybierz diete dostosowana do twojego treningu !</h1>
                <Karuzela_dietetycy></Karuzela_dietetycy>



            </div>
        </div>
    );
}

export default Kadra;