import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import Button from "react-bootstrap/Button";

function Account_Edit_data_edit() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

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

    const handleSubmitData = (e) => {
        e.preventDefault();

        postData('http://127.0.0.1:8000/users/edit/', {
            username: username,
            first_name: firstname,
            last_name: lastname,
            email: email
        })
            .then(data => {
                window.location.reload();
            });
    }

    useEffect(() => {

        axiosInstance
            .get(`users/info/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setEmail(res.data.email)
                setUsername(res.data.username)
                setFirstname(res.data.first_name)
                setLastname(res.data.last_name)
            });

    }, []);

    return (
        <div className="account_data_edit">

            <div className="col-md-8 mx-auto mt-3">

                <div className="card mb-3">
                    <div className="card-body">

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Username</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" className="form-control form-control-sm" placeholder={username}
                                       onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Imie</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" className="form-control form-control-sm" placeholder={firstname}
                                       onChange={(e) => setFirstname(e.target.value)}/>
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Nazwisko</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" className="form-control form-control-sm" placeholder={lastname}
                                       onChange={(e) => setLastname(e.target.value)}/>
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Mail</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="text" className="form-control form-control-sm" placeholder={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <Button onClick={handleSubmitData} variant="primary" size="sm">Zapisz</Button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default Account_Edit_data_edit;