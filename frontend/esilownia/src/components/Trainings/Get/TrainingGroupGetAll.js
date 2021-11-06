import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Photo from '../../../imgs/gymcoin.png'


function TrainingGroupGetAll() {

    const [trainingGroupAll, setTrainingGroupAll] = useState([]);
    const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState([]);


    useEffect(() => {

        axiosInstance
            .post(`training/group/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTrainingGroupAll(res.data)
                console.log(res.data)
            });

        axiosInstance
            .post(`training/group/type/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTrainingGroupTypeAll(res.data)
            });

    }, []);
    return (
        <div className="trainingGroupGetAll">

            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Wszystkie grupy</h1>
                <hr></hr>
            </div>

            <div className="col-lg-2 border" id="tren_col">
                <h5 className="font-weight-light">Typ Treningu:</h5>
                <select className="font-weight-light mb-2">
                    {trainingGroupTypeAll.map(function(cValue, idx){
                        return (<option key={idx}>{cValue.type}</option>)
                    })}
                </select>
            </div>

            <div className="row border p-4 mb-4 mt-4 text-center" id="tren_container">
                {trainingGroupAll.map(function (cValue, idx) {

                    if(cValue.difficulty === "0"){
                        cValue.difficulty = "Łatwy"
                    }
                    if(cValue.difficulty === "1"){
                        cValue.difficulty = "Średni"
                    }
                    if(cValue.difficulty === "2"){
                        cValue.difficulty = "Trudny"
                    }
                    if(cValue.difficulty === "3"){
                        cValue.difficulty = "Armagedon"
                    }

                    return (
                        <div className="row">
                            <div className="card m-4" id="karta_tren">
                                <img src={Photo} width="100%" height="width" className="card-img-top rounded-circle"
                                     alt="..."/>
                                <div className="card-body">
                                    <div key={idx}>
                                        <h5 className="card-title">{cValue.title}</h5>
                                        <p className="card-subtitle">Typ:
                                        { trainingGroupTypeAll.map(function (type,id){
                                            for(let i=0; i < cValue.type.length; i++) {
                                                if(cValue.type.includes(type.id)){
                                                    return(<p>{type.type}</p>)
                                                }
                                            }
                                        })}
                                        </p>
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