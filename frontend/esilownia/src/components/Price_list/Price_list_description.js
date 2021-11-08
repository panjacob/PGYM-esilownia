import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Price_list_description() {
    return (

        <div id="price_list_description">
            <div className="row justify-content-center my-5">

                <div className="container text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-3 font-weight-light"><i>Co to Gymcoin ?</i></h1>
                    <hr></hr>
                </div>

                <div id="zawartosc_opis_cennik" className="container p-5 font-weight-light border rounded border-3 border-dark mt-2">
                    <div className="row text-center">

                        <div className="col-md my-auto">
                            <hr width="80%"/>
                            Gym-coin to nasza wirtualna waluta.
                            <hr width="80%"/>
                        </div>

                        <div className="col-md my-auto">
                            <hr width="80%"/>
                            Kupione tokeny trafiaja do twojego portfela.
                            <hr width="80%"/>
                        </div>

                        <div className="col-md my-auto">
                            <hr width="80%"/>
                            Każda oferta w serwisie kosztuje Gym-coiny.
                            <hr width="80%"/>
                        </div>

                    </div>
                    <hr color={'black'} width={'50%'} className={'mt-2 mb-2'}/>
                    <div className="row text-center">

                        <div className="col-md my-auto">
                            <hr width="80%"/>
                            Wykupujesz treningi i diety bez potrzeby płatności przy każdej transakcji.
                            <hr width="80%"/>
                        </div>

                        <div className="col-md my-auto">
                            <hr width="80%"/>
                            Na start dostajesz 20 darmowych Gym-coinów.
                            <hr width="80%"/>
                        </div>

                        <div className="col-md my-auto">
                            <hr width="80%"/>
                            Jedyne co robisz to dołodowujesz konto i bezproblemowo nabywasz treningi i diety.
                            <hr width="80%"/>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Price_list_description;