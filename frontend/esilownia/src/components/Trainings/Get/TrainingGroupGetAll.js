import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Photo from '../../../imgs/gymcoin.png'


function TrainingGroupGetAll(){
const [trainingGroupAll, setTrainingGroupAll] = useState([]);


useEffect(() => {

    axiosInstance
        .post(`training/group/all`, {},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            setTrainingGroupAll(res.data)
        });

}, []);
    return(
        <div className="trainingGroupGetAll">
            <div className="row border p-4 mb-4 mt-4 text-center" id="tren_container">
                {trainingGroupAll.map(function(cValue, idx){
                    
                    if(cValue.difficulty <= 0){
                        cValue.difficulty = "Łatwy"
                    }else if(cValue.difficulty <= 1){
                        cValue.difficulty = "Średni"
                    }else if(cValue.difficulty <= 2){
                        cValue.difficulty = "Zaawansowany"
                    }else{
                        cValue.difficulty = "Armagedon"
                    }
                
                    return (
                        <div className="row">
                            <div className="card m-4" id="karta_tren">
                                <img src={Photo} width="100%" height="width" className="card-img-top rounded-circle" alt="..."/>
                                <div className="card-body">
                                    <div key={idx}>
                                        <h5 className="card-title">{cValue.title}</h5>
                                        <p className="card-subtitle">Typ: {cValue.type}</p>
                                        <p className="card-text"> Poziom: {cValue.difficulty}</p>
                                        <p>id={cValue.id}</p>
                                        <a href="#" class="btn btn-lg">Kup dostęp</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
export default TrainingGroupGetAll;