import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import profilePicture from '../../imgs/basic_profile_photo.jpg'
import Button from "react-bootstrap/Button";

function Account_photo_change() {

    const handleSubmitPic = (e) => {
        e.preventDefault();
    }

    return (
        <div className="account_photo_change">

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

                        <div className="row">
                            <div className="mx-auto pt-1">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="customFile"></input>
                                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                </div>
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <Button onClick={handleSubmitPic} variant="primary" size="sm">Zmien Zdjecie</Button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Account_photo_change;