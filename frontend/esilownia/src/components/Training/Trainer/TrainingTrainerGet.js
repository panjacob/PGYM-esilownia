import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";

function TrainingTrainerGet(props){
    const [trainingInfo, setTrainingInfo] = useState([])
    const [groupInfo, setGroupInfo] = useState([])

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

        axiosInstance
            .post(`training/get`, {id:groupInfo.training}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTrainingInfo(res.data)
            });



        }, [props.groupId]);

    return(
        <div className="training_user_container">
            <hr/>
            <h1 style={{"fontSize": "4vw"}} className="display-1 font-weight-light mb-4">Trening</h1>
            <hr/>
            <div className="container">
                <div className="row border">
                    <div className="col-md-5">
                        {(trainingInfo.id < 0) ? (
                            <div>
                            <p>Brak Treningów</p>
                            </div>
                        ) : (
                            <div>
                            <p>{trainingInfo.id}</p>
                            <p>{trainingInfo.title}</p>
                            <p>{trainingInfo.description}</p>
                            <p>{trainingInfo.date_start}</p>
                            <p>{trainingInfo.date_end}</p>
                            <p>{trainingInfo.calories}</p>
                            <p>{trainingInfo.ping}</p>
                            <p>{trainingInfo.file}</p>
                            <p>{trainingInfo.training_group}</p>
                            <p>{trainingInfo.participants}</p>
                            </div>
                        )
                        }

                    </div>
                </div>
            </div>
        </div>
    );

}
export default TrainingTrainerGet;