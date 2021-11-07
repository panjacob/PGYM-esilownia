import React, {useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import Button from "react-bootstrap/Button";

function ModeratorPanelApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        axiosInstance
            .post(`/moderator/application/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                console.log(res.data)
                setApplications(res.data)
            });

    }, []);

    const handleSubmitTrainer = (id) => (e) => {
        e.preventDefault();

        axiosInstance
            .post(`/users/set_coach/`, {
                id: id,
                value: 'true'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                window.location.reload();
            });
    }

    const handleSubmitNutricionist = (id) => (e) => {
        e.preventDefault();
        console.log(id)
        axiosInstance
            .post(`/users/set_dietician/`, {
                id: id,
                value: 'true'
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                window.location.reload();
            });
    }

    const handleSubmitReject = (e) => {
        e.preventDefault();

    }

    const listItems = applications.map((id) =>
        <div className="row" key={id.id} id={`application-${id.id}`}>
            <div className="card m-3" style={{width: '100%'}}>
                <div className="card-body">
                    <div className="row">

                        <div className="col-4">
                            <h6 className="mb-0">Data</h6>
                        </div>

                        <div className="col text-secondary">
                            {id.date.slice(0, 19).replace('T', " ")}
                        </div>

                    </div>
                    <hr></hr>
                    <div className="row">

                        <div className="col-4">
                            <h6 className="mb-0">Opis</h6>
                        </div>

                        <div className="col text-secondary">
                            {id.description}
                        </div>

                    </div>
                    <hr></hr>
                    <div className="row">

                        <div className="col-4">
                            <h6 className="mb-0">Owner Id</h6>
                        </div>

                        <div className="col text-secondary">
                            {id.owner}
                        </div>

                    </div>
                    <hr></hr>

                    <div className="row ml-1">
                        <Button className="m-1" onClick={handleSubmitTrainer(id.id)} variant="primary"
                                size="sm">Trener</Button>
                        <Button className="m-1" onClick={handleSubmitNutricionist(id.id)} variant="primary"
                                size="sm">Dietetyk</Button>
                        <Button className="m-1" onClick={handleSubmitReject} variant="primary" size="sm">Odrzuć</Button>
                    </div>

                </div>
            </div>
        </div>
    );

    return (
        <div className="moderatorPanelApplications">
            <div className="container">
                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Aplikacje na
                        pozycje</h1>
                    <hr></hr>
                </div>
                <div className="my-2 border">
                    <div className="container" style={{overflowY: 'scroll', flex: '1', height: '575px'}}>
                        {listItems}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModeratorPanelApplications;