import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import profilePicture from '../../imgs/basic_profile_photo.jpg'
import axiosInstance from "../Axios/Axios";
import axios_variebles from "../Axios/Axios_variebles";
import {useLocation} from "react-router-dom";

function User_photo() {

    const [photo, setPhoto] = useState("");
    const location = useLocation()


    useEffect(() => {

        const search = location.search;
        const id = new URLSearchParams(search).get('id');

        axiosInstance
            .post(`users/get/`, {id: id}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                if(res.data.profile_photo === null){
                    setPhoto(profilePicture)
                } else {
                    setPhoto(axios_variebles.baseURL.slice(0, -1) + res.data.profile_photo)
                }
            });

    }, []);

    return (
        <div className="user_photo">

            <div className="col-md-8 mx-auto mt-3">

                <div className="card mb-3 bg-light">

                    <div className="card-body">
                        <div className="row">
                            <div className="mx-auto">
                                <img src={photo} alt="..." className="img-thumbnail" width='200px'
                                     height='200px'/>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default User_photo;