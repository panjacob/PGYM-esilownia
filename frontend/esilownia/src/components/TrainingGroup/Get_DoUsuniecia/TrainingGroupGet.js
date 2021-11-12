import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Photo from '../../../imgs/gymcoin.png';


function TrainingGroupGet(){
const [trainingGroup, setTrainingGroup] = useState([]);


useEffect(() => {

    axiosInstance
        .post(`training/group/get`, { id:"1"},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            setTrainingGroup(res.data)
        });

}, []);

    return(
        <div className="trainingGroupGet">
            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Twoje Grupy</h1>
                <hr></hr>
            </div>
            <div className="row p-4 border mb-4 mt-4 text-center flex" id="tren_container">

                
                <div className="card m-1" id="karta_tren">
                    <img src={trainingGroup.image} width="100%" height="width" className="card-img-top rounded-circle"
                            alt="..." placeholder={Photo}/>
                    <div className="card-body">
                        <h5 className="card-title">{trainingGroup.title}</h5>
                        <div className="card-subtitle">{trainingGroup.type}</div>
                        <p className="card-text"> Poziom: {trainingGroup.difficulty}</p>
                        <p className="card-text"> Trener: {trainingGroup.owner}</p>
                        <p className="card-text">{trainingGroup.description}</p>
                        <p className="card-text">{trainingGroup.date}</p>
                        <p className="card-text">{trainingGroup.participants}</p>
                        <p className="card-text">{trainingGroup.trainings}</p>
                        <p className="card-text">id={trainingGroup.id}</p>
                        <button className="btn btn-lg">Dołącz {trainingGroup.price}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TrainingGroupGet;