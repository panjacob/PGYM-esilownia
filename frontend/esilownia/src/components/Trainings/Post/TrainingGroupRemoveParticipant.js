import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TrainingGroupRemoveParticipant(){
    
    const [participant, setParticipant] = useState([]);
    const [trainingGroup, setTrainingGroup] = useState([]);

    function validateForm() {
        return participant.length > 0 && trainingGroup.length > 0;
    }

const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
        .post(`training/group/participant/remove`,{id:"1", participant:"1"}, {
            participant: participant,
            trainingGroup: trainingGroup,
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
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="date">
                    <Form.Label>Użytkownik</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={participant}
                        onChange={(e) => setParticipant(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="text">
                    <Form.Label>Grupa</Form.Label>
                    <Form.Control
                        type="text"
                        value={trainingGroup}
                        onChange={(e) => setTrainingGroup(e.target.value)}
                    />
                </Form.Group>
                <Button onClick={handleSubmit} block size="lg" className="btn btn-lg" id="btn-login" type="submit"
                        disabled={!validateForm()}>
                    Usuń użytkownika
                </Button>
            </Form>
        </div>
    );
}
export default TrainingGroupRemoveParticipant;