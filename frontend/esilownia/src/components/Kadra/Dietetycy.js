import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Photo from '../../imgs/basic_profile_photo.jpg'

function Dietetycy() {
    return (
        <div className="dietetycy">
            <div className="row">
                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoDietetyk"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Imie Nazwisko</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Dietetyk</i>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoDietetyk"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Imie Nazwisko</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Dietetyk</i>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoDietetyk"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Imie Nazwisko</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Dietetyk</i>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="row justify-content-center">
                        <img src={Photo} width="75%" height="width" className="rounded-circle border border-dark"
                             alt="PhotoDietetyk"/>
                    </div>
                    <div className="row justify-content-center">
                        <p><b>Imie Nazwisko</b></p>
                    </div>
                    <div className="row justify-content-center">
                        <i>Dietetyk</i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dietetycy;