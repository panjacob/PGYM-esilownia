import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TrainingGroupAddParticipant(){
    
    const [paymentType, setPaymentType] = useState([]);
    const [trainingGroup, setTrainingGroup] = useState([]);

    function validateForm() {
        return paymentType.length > 0 && trainingGroup.length > 0;
    }

const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
        .post(`training/group/join`,{id:"1", payment_type:"0"}, {
            payment_type: paymentType,
            training_group: trainingGroup,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            console.log(res)

        });
};

    return(
        <div className="addParticipant">
            <button className="btn btn-lg" onClick={handleSubmit}>Dołącz</button>
        </div>
    );
}
export default TrainingGroupAddParticipant;