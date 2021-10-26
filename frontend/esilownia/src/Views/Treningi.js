import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Treningi() {
    return (
        <div className="treningi">
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
                        <h1 className="font-weight-light">Treningi</h1>
                        <p>
                            Strona na treninig
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Treningi;