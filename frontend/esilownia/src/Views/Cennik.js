import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Cennik() {
    return (
        <div class="cennik">
            <div class="container text-center">
                <h1 class="display-1 font-weight-light">Cennik</h1>
            </div>
            <div class="container mb-4">
                <div class="row text-center">
                    <div class="col-md-4">
                        <div class="col-md-12 border rounded shadow-lg">
                            <h2 class="font-weight-light">Starter</h2>
                            <p class="font-weight-light">30h treningu</p>
                            <p class="font-weight-light">2 tyg diety</p>
                            <button type="button" class="btn btn-lg">$20</button>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="col-md-12 border rounded shadow-lg">
                            <h2 class="font-weight-light">Classic</h2>
                            <p class="font-weight-light">60h treningu</p>
                            <p class="font-weight-light">1.5 mesiac diety</p>
                            <button type="button" class="btn btn-lg">$35</button>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="col-md-12 border rounded shadow-lg">
                            <h2 class="font-weight-light">Premium</h2>
                            <p class="font-weight-light">120h treningu</p>
                            <p class="font-weight-light">2 mesiac diety</p>
                            <button type="button" class="btn btn-lg">$60</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cennik;