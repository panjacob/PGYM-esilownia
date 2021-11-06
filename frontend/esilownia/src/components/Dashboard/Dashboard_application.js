import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import Button from "react-bootstrap/Button";

function DashboardApplication() {

    const [description, setDescription] = useState("");
    console.log(description)

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
        urlencoded.append("description", description);

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


    return (
        <div className="dashboardApplication">

            <div className="col-md-8 mx-auto mt-3">

                <div className="card mb-3">
                    <div className="card-body">

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Application</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <textarea type="text-area" className="form-control form-control-sm"
                                       onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                        </div>

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

export default DashboardApplication;