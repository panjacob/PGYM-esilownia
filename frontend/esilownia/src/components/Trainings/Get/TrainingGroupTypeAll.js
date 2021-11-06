import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";

function TrainingGroupTypeAll(){
const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState([]);

useEffect(() => {

    axiosInstance
        .post(`training/group/type/all`, {},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            setTrainingGroupTypeAll(res.data)
        });

}, []);
    return(
        <div className="trainingGroupTypeAll">
            <div className="container pt-4 m-4 font-weight-light">
                <div className="col-lg-2 border" id="tren_col">
                <h5 className="font-weight-light">Typ Treningu:</h5> 
                <select className="font-weight-light mb-2">
                    {trainingGroupTypeAll.map(function(cValue, idx){
                        return (<option key={idx}>{cValue.type}</option>)
                    })}
                </select>
                </div>

            </div>
        </div>
    );
}
export default TrainingGroupTypeAll;