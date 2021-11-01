import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/axios";

function TrainingGroupTypeAll(){
const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState("");

useEffect(() => {

    axiosInstance
        .get(`training/group/type/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            //console.log(res)
            //console.log(res.data)

            setTrainingGroupTypeAll(res.data.trainingGroupTypeAll)

        });

}, []);
    return(
        <div className="trainingGroupTypeAll">
        </div>
    );
}
export default TrainingGroupTypeAll;