import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";

function Training_user(){
    const [trainingInfo, setTrainingInfo] = useState([])
    const [groupInfo, setGroupInfo] = useState([])

    useEffect(() => {

        axiosInstance
            .post(`training/get`, {id:groupInfo.id}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTrainingInfo(res.data)
            });
    }, []);

    return(
        <div className="training_user_container">
            <div className="container">
                <div className="row border">
                    <div className="col-md-5">
                        {trainingInfo.id}
                        {trainingInfo.title}
                        {trainingInfo.description}
                        {trainingInfo.date_start}
                        {trainingInfo.date_end}
                        {trainingInfo.calories}
                        {trainingInfo.ping}
                        {trainingInfo.file}
                        {trainingInfo.training_group}
                        {trainingInfo.participants}
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Training_user;