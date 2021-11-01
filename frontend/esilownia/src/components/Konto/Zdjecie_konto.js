import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import profilePicture from '../../imgs/basic_profile_photo.jpg'

function Zdjecie_konto() {

    return (
        <div className="zdjecie_konto">

            <div className="col-md-8 mx-auto mt-3">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="mx-auto">
                                <h6 className="mb-0">Zdjecie profilowe</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mx-auto">
                                <img src={profilePicture} alt="..." className="img-thumbnail" width='200px'
                                     height='200px'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Zdjecie_konto;