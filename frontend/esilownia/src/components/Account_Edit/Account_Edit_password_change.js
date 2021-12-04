import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import axiosInstance from "../Axios/Axios";

function Account_Edit_password_change() {

    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");

    const handleSubmitPass = (e) => {
        e.preventDefault();

        axiosInstance
            .post(`users/change_password/`, {
                old_password: oldpassword,
                new_password: newpassword
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                window.location.reload();
            });

    };

    return (
        <div className="account_password_change">

            <div className="col-md-8 mx-auto mt-3">

                <div className="card mb-3 bg-light">

                    <div className="card-body">

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Stare hasło</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="password" className="form-control form-control-sm"
                                       onChange={(e) => setOldPassword(e.target.value)}/>
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Nowe Hasło</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="password" className="form-control form-control-sm"
                                       onChange={(e) => setNewPassword(e.target.value)}/>
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <Button onClick={handleSubmitPass} variant="btn" size="sm">Zapisz</Button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Account_Edit_password_change;