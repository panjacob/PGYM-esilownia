import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/axios";

function Trening_grupa(){
const [trainingGroup, setTrainingGroup] = useState("");

useEffect(() => {

    axiosInstance
        .get(`training/group/get/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            //console.log(res)
            //console.log(res.data)

            setTrainingGroup(res.data.trainingGroup)

        });

}, []);
    return(
        <div className="trening_grupa">
            <button className="btn btn-lg" onClick={console.log({trainingGroup})}>Dołącz</button>
        </div>
    );
}
export default Trening_grupa;