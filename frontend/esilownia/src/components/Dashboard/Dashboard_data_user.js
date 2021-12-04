import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import profilePicture from '../../imgs/basic_profile_photo.jpg'
import axiosInstance from "../Axios/Axios";
import axios_variebles from "../Axios/Axios_variebles";

function Dashboard_data_user() {

    const [username, setUsername] = useState("");
    const [gymcoin, setGymcoin] = useState("")
    const [photo, setPhoto] = useState("");

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
                setGymcoin(res.data.money)
                if(res.data.profile_photo === null){
                    setPhoto(profilePicture)
                } else {
                    setPhoto(axios_variebles.baseURL.slice(0, -1) + res.data.profile_photo)
                }

                let UserRole = ["user"]
                if(res.data.is_coach === true){
                    UserRole.push("trainer")
                }
                if(res.data.is_dietician === true){
                    UserRole.push("dietician")
                }
                if(res.data.is_moderator === true){
                    UserRole.push("moderator")
                }

                localStorage.setItem('role', JSON.stringify(UserRole));

            });

    }, []);

    return (
        <div className="dashboard_data_user">

            <div className="card mb-3 mt-3 shadow bg-light">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-5 justify-content-center">
                            <div className="row justify-content-center">
                                <div className="mx-1">
                                    <img src={photo} alt="..." className="img-thumbnail" width='200px'
                                         height='200px'/>
                                </div>

                            </div>

                        </div>
                        <div className="col-sm-7 my-auto px-5">
                            <div className="row justify-content-center border p-2 my-5">

                                <div className="col-sm-5 ">
                                    <h5 className="mb-0">Użytkownik</h5>
                                </div>

                                <div className="col-sm-7 text-secondary ">
                                    <h5 className="mb-0">{username}</h5>
                                </div>

                            </div>
                            <div className="row justify-content-center border p-2 my-5">

                                <div className="col-sm-5 ">
                                    <h5 className="mb-0">GymCoin</h5>
                                </div>

                                <div className="col-sm-7 text-secondary ">
                                    <h5 className="mb-0">{gymcoin}</h5>
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