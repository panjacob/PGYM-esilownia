import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Price_list_description() {
    return (

        <div id="price_list_description">
            <div className="row justify-content-center my-5">

                <div className="container text-center">
                    <hr></hr>
                    <h1 style={{"font-size": "5vw"}} className="display-3 font-weight-light"><i>Co to Gymcoin ?</i></h1>
                    <hr></hr>
                </div>

                <div id="zawartosc_opis_cennik" className="container p-5 font-weight-light border rounded border-3 border-dark">
                    <div className="row text-center">

                        <div className="col-md my-auto">
                            <hr width="80%"/>
                            Gymcoin to nasza wirtualna waluta,
                            pozwala na kupowanie treningów od trenerów.
                            <hr width="80%"/>
                        </div>

                        <div className="col-md my-auto">
                            <hr width="80%"/>
                            Gymcoiny pozwalaja ci uniknać ciaglych płatności przy kazdym zakupie.
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