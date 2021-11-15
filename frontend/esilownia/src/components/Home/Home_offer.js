import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

function HomeOffer() {

    return (
        <div className="homeOffer">

            <div className='row justify-content-center mt-5 '>
                <div className='col-md-5 m-1' width={'100%'} height={'100%'}>
                    <div className="col-md-12 h-100 border rounded shadow-lg p-3" style={{  display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'}}>
                        <div>
                        <h4 className="font-weight-light ">Dołacz jako Użytkownik</h4>
                        <hr color={'black'} width={'30%'} className='my-4'/>
                        </div>
                        <p className="font-weight-light">Szukasz miejsca do ćwiczen bez wychodzenia z domu ? Nie
                            masz czasu na dojazdy na siłownie ?</p>

                        <p className="font-weight-light">Jeśli tak to E-siłownia jest idealnym miejscem dla
                            Ciebie!</p>

                        <Link className="align-self-center btn btn-lg mt-2 align-self-end" to="/register">Załóż darmowe
                            konto</Link>

                    </div>
                </div>
                <div className='col-md-5 m-1' width={'100%'} height={'100%'}>
                    <div className="col-md-12 h-100 border rounded shadow-lg p-3" style={{  display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'}}>
                        <div>
                        <h4 className="font-weight-light">Dołacz jako Trener lub Dietetyk</h4>
                        <hr color={'black'} width={'30%'} className='my-4'/>
                        </div>
                        <p className="font-weight-light">Masz uprawnienia trenera fitness, trenera personalnego czy
                            po prostu jesteś sportowcem?</p>
                        <p className="font-weight-light">Po założeniu konta zaaplikuj o pozycje trenera lub
                            dietetyka.</p>

                        <Link className="align-self-center btn btn-lg mt-2 align-self-end" to="/register">Dołacz do
                            nas</Link>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default HomeOffer;