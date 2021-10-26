import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";

function Konto_zmiana_hasla() {

    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response.json();
    }

    const handleSubmitPass = (e) => {
        e.preventDefault();
        //console.log(oldpassword)
        //console.log(newpassword)

        postData('http://127.0.0.1:8000/users/change_password/', {
            old_password: oldpassword,
            new_password: newpassword })
            .then(data => {
                //console.log(data);
                //window.location.reload();
            });
    };

    return (
        <div className="konto_zmiana_hasla">

            <div className="col-md-8 mx-auto mt-3">
                <div className="card mb-3">
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
                                <Button onClick={handleSubmitPass} variant="primary" size="sm">Zapisz</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Konto_zmiana_hasla;