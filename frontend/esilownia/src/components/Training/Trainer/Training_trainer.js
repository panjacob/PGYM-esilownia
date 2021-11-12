import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";

function TrainingTrainer(props) {

    const [groupInfo, setGroupInfo] = useState([]);

    useEffect(() => {

        axiosInstance
            .post(`training/group/get`, {id: props.groupId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setGroupInfo(res.data)
            });

    }, [props.groupId]);

    return (
        <div className="trainingTrainer">
            <div className="container">

                <div className='row text-center'>

                    <p>{JSON.stringify(groupInfo)}</p>

                </div>

            </div>
        </div>
    );
}

export default TrainingTrainer;