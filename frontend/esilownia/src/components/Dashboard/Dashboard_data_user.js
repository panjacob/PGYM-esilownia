import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import profilePicture from '../../imgs/basic_profile_photo.jpg'
import axiosInstance from "../Axios/Axios";

function Dashboard_data_user() {

    const [username, setUsername] = useState("");

    useEffect(() => {

        axiosInstance
            .post(`users/info/`, {},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUsername(res.data.username)
            });

    }, []);

    return (
        <div className="dashboard_data_user">

            <div className="card mb-3 mt-3 shadow">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-5 justify-content-center">

                            <div className="row justify-content-center">

                                <div className="mx-1">
                                    <h6 className="mb-0">Zdjecie profilowe</h6>
                                </div>

                            </div>

                            <div className="row justify-content-center">

                                <div className="mx-1">
                                    <img src={profilePicture} alt="..." className="img-thumbnail" width='200px'
                                         height='200px'/>
                                </div>

                            </div>

                        </div>
                        <div className="col-sm-7 my-auto px-5">
                            <div className="row justify-content-center border p-2 my-5">

                                <div className="col-sm-5 ">
                                    <h5 className="mb-0">Username</h5>
                                </div>

                                <div className="col-sm-7 text-secondary ">
                                    <h5 className="mb-0">{username}</h5>
                                </div>

                            </div>
                            <div className="row justify-content-center border p-2 my-5">

                                <div className="col-sm-5 ">
                                    <h5 className="mb-0">Gym-coin</h5>
                                </div>

                                <div className="col-sm-7 text-secondary ">
                                    <h5 className="mb-0">0</h5>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard_data_user;