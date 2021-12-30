import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import {useLocation} from "react-router-dom";

function Account_data() {

    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const location = useLocation()


    useEffect(() => {
        const search = location.search;
        const id = new URLSearchParams(search).get('id');

        axiosInstance
            .post(`users/get/`, {id:id},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUsername(res.data.username)
                setFirstname(res.data.first_name)
                setLastname(res.data.last_name)
            });


    }, []);

    return (
        <div className="user_data">

            <div className="col-md-8 mx-auto mt-3">

                <div className="card mb-3 bg-light">

                    <div className="card-body">

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Username</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {username}
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Imie</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {firstname}
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Nazwisko</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {lastname}
                            </div>
                        </div>
                        <hr></hr>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account_data;