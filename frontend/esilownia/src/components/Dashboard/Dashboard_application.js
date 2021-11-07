import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import Button from "react-bootstrap/Button";

function DashboardApplication() {

    const [description, setDescription] = useState("");
    const [appRole, setAppRole] = useState("");


    const handleSubmitData = (e) => {
        e.preventDefault();

        // axiosInstance
        //     .post(`/moderator/application/send`, {
        //         description: description
        //     },{
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
        //         }
        //     })
        //     .then((res) => {
        //         window.location.reload();
        //     });

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("description", description+" "+appRole);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/moderator/application/send", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const ApplicationRole = (e) => {
        //console.log(e.target.value);
        setAppRole(e.target.value)
    }

    return (
        <div className="dashboardApplication">

            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Aplikacja</h1>
                <h1 style={{"fontSize": "2vw"}} className="display-1 font-weight-light mb-4">Aplikuj na pozycje trenera
                    lub dietetyka</h1>
                <hr></hr>
            </div>

            <div className="col-md-8 mx-auto mt-3">

                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-12 text-secondary">
                                <h1 style={{"fontSize": "1.25vw"}} className="display-1 font-weight-light mb-4">Tekst podania</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 text-secondary">
                                <textarea type="text-area" rows={5} className="form-control form-control-sm"
                                          onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 m-1 text-secondary">
                                <div onChange={ApplicationRole.bind(this)}>
                                    <div className="mx-2">
                                        <input type="radio" value="Trainer"
                                               name="application_role"/> Trener
                                    </div>
                                    <div className="mx-2">
                                        <input type="radio" value="Dietetician"
                                               name="application_role"/> Dietetyk
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-1">
                            <div className="col-sm-3">
                                <Button onClick={handleSubmitData} variant="primary" size="sm">Wyślij aplikacje</Button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default DashboardApplication;