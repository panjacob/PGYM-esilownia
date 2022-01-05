import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Photo1 from '../../imgs/Dietetyk1.jfif'
import Photo2 from '../../imgs/Dietetyk2.jfif'
import Photo3 from '../../imgs/Dietetyke.jfif'
import Photo4 from '../../imgs/Dietetyk4.jfif'

function Cadre_nutritionists() {
    return (
        <div className="cadre_nutritionists">

            <hr></hr>
            <h1 style={{"fontSize": "4vw"}} className="font-weight-light pt-4 pb-4">Nasi Dietetycy</h1>
            <hr></hr>

            <div className="row">

                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo1} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoDietetyk"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Alicja Pietrzak</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Dietetyk</i>
                    </div>
                </div>

                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo2} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoDietetyk"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Aureliusz Sikora</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Dietetyk</i>
                    </div>
                </div>

                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo3} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoDietetyk"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Damian Chmielewski</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Dietetyk</i>
                    </div>
                </div>

                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo4} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoDietetyk"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Kamila Ssak</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Dietetyk</i>
                    </div>
                </div>

            </div>

            <hr></hr>

        </div>
    );
}

export default Cadre_nutritionists;