import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Photo1 from '../../imgs/trener1.jfif'
import Photo2 from '../../imgs/trener2.jfif'
import Photo3 from '../../imgs/trener3.jfif'
import Photo4 from '../../imgs/trener4.jfif'

function Cadre_trainers() {
    return (
        <div className="cadre_trainers">

            <hr></hr>
            <h1 style={{"fontSize": "4vw"}} className="font-weight-light pt-4 pb-4">Nasi Trenerzy</h1>
            <hr></hr>

            <div className="row">

                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo1} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoTrener"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Ignacy Wojciechowski</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Trener Strongman</i>
                    </div>
                </div>

                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo2} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoTrener"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Robert Jaworski</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Trener Kalenistyki</i>
                    </div>
                </div>

                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo3} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoTrener"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Krystian Kamiński</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Trener Crossfit</i>
                    </div>
                </div>

                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo4} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoTrener"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Aleksandra Zielińska</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Trener Fitness</i>
                    </div>
                </div>

            </div>

            <hr></hr>

        </div>
    );
}

export default Cadre_trainers;