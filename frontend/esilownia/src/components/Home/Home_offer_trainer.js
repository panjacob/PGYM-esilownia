import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home_offer_trainer() {
    return (
        <div className="home_offer_trainer">
            <div className="container mb-4">
                <div className="row text-center">

                    <div className="col-md-4">
                        <div className="col-md-12 border rounded shadow-lg">
                            <h4 className="font-weight-light">Poszukujemy osób do współpracy!</h4>
                            <p className="font-weight-light">Masz uprawnienia trenera fitness, trenera personalnego czy
                                po prostu jesteś sportowcem?
                                Jeśli tak to E-siłownia jest idealnym miejscem dla Ciebie!</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="col-md-12 border rounded shadow-lg">
                            <h4 className="font-weight-light">Co oferuje współpraca z nami?</h4>
                            <ul>
                                <li className="font-weight-light">Prowadzenie treningów online na twoich zasadach.</li>
                                <li className="font-weight-light">Możesz prowadzić ćwiczenia grupowe, treningi
                                    personalne czy układać diety!
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="col-md-12 border rounded shadow-lg" id="trener_col">

                            <h4 className="font-weight-light">Jakie masz z tego korzyści?</h4>
                            <ul>
                                <li className="font-weight-light">To ty decydujesz kiedy, jak pracujesz i ile
                                    zarabiasz.
                                </li>
                                <li className="font-weight-light">Masz możliwość zarabiać w dowolnym miejscu na
                                    świecie!
                                </li>
                            </ul>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home_offer_trainer;