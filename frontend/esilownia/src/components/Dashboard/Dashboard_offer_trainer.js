import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard_offer_trainer() {
    return (
        <div className="dashboard_offer_trainer">
            <div className="container mb-4">
                <div className="row text-center">

                    <div className="col-lg-4 mb-3 align-middle">
                        <div className="col-md-12 h-100 p-3 border rounded shadow">

                            <div className="m-1 mb-2 d-flex align-items-center justify-content-center"
                                 style={{minHeight: '60px'}}>
                                <h4 className="m-1 d-flex align-items-center font-weight-light">Poszukujemy osób do
                                    współpracy !</h4>
                            </div>

                            <hr/>
                            <p className="font-weight-light">Masz uprawnienia trenera fitness, trenera personalnego czy
                                po prostu jesteś sportowcem ?</p>
                            <p className="font-weight-light">Jeśli tak to E-siłownia jest idealnym miejscem dla Ciebie
                                !</p>

                        </div>
                    </div>

                    <div className="col-lg-4 mb-3 align-middle">
                        <div className="col-md-12 h-100 p-3 border rounded shadow">

                            <div className="m-1 mb-2 d-flex align-items-center justify-content-center"
                                 style={{minHeight: '60px'}}>
                                <h4 className="m-1 d-flex align-items-center font-weight-light">Co oferuje współpraca z
                                    nami ?</h4>
                            </div>
                            <hr/>
                            <p className="font-weight-light">Prowadzenie treningów online na twoich zasadach.</p>
                            <p className="font-weight-light">Możesz prowadzić ćwiczenia grupowe, treningi
                                personalne czy układać diety !</p>

                        </div>
                    </div>

                    <div className="col-lg-4 mb-3 align-middle">
                        <div className="col-md-12 h-100 p-3 border rounded shadow">

                            <div className="m-1 mb-2 d-flex align-items-center justify-content-center"
                                 style={{minHeight: '60px'}}>
                                <h4 className="m-1 d-flex align-items-center font-weight-light">Jakie masz z tego
                                    korzyści ?</h4>
                            </div>
                            <hr/>
                            <p className="font-weight-light">To ty decydujesz kiedy, jak pracujesz i ile
                                zarabiasz.</p>
                            <p className="font-weight-light">Masz możliwość zarabiać w dowolnym miejscu na
                                świecie !</p>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard_offer_trainer;