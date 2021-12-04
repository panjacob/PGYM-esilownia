import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Photo from '../../imgs/basic_profile_photo.jpg'

function Cadre_trainers() {
    return (
        <div className="cadre_trainers">

            <hr></hr>
            <h1 style={{"fontSize": "4vw"}} className="font-weight-light pt-4 pb-4">Nasi Trenerzy</h1>
            <hr></hr>

            <div className="row">

                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoTrener"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Imie Nazwisko</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Trener</i>
                    </div>
                </div>

                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoTrener"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Imie Nazwisko</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Trener</i>
                    </div>
                </div>

                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoTrener"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Imie Nazwisko</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Trener</i>
                    </div>
                </div>

                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoTrener"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Imie Nazwisko</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Trener</i>
                    </div>
                </div>

            </div>

            <hr></hr>

        </div>
    );
}

export default Cadre_trainers;