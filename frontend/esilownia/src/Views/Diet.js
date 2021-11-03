import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Diet() {
    return (
        <div className="diet">
            <div className="container">
                <div className="row align-items-center my-5">
                    <div className="col-lg-7">
                        <img
                            className="img-fluid rounded mb-4 mb-lg-0"
                            src="https://riotopgym.pl/wp-content/uploads/2020/06/IMG-3651.jpg"
                            alt=""
                        />
                    </div>
                    <div className="col-lg-5">
                        <h1 className="font-weight-light">Dieta</h1>
                        <p>
                            Strona na diety
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Diet;