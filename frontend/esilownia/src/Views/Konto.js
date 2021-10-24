import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../components/Axios/axios";

function Konto() {

    useEffect(() => {

        axiosInstance
            .get(`/users/info`, {
                // grant_type: 'password',
                // client_id: 'TUz2wd25Z9hfRbOUr9z3CFEKAc42hJrjsz57sMt6',
                // client_secret:
                //     'QpMCaevBW6VRJ42wtJ1Cgqitz0aVuBMJRQFgULMTGYievg572RVlcQoTD6xtaVf4mL6K38Df6tcazzfsxMfaDTEjzbH343kFCItJfJKEa2bcjL0ukufLOsfQCAFx3hTR',
            })
            .then((res) => {
                console.log(res)
                console.log(res.data)

            });

    });

    return (
        <div className="konto">
            <div class="container">
                <div class="row align-items-center my-5">
                    <div class="col-lg-7">
                        <img
                            class="img-fluid rounded mb-4 mb-lg-0"
                            src="https://riotopgym.pl/wp-content/uploads/2020/06/IMG-3651.jpg"
                            alt=""
                        />
                    </div>
                    <div class="col-lg-5">
                        <h1 class="font-weight-light">Konto</h1>
                        <p>
                            Strona na diety
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Konto;