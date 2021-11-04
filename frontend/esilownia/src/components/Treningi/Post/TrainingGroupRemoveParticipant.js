import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TrainingGroupRemoveParticipant(){
    
    const [participant, setParticipant] = useState("");
    const [trainingGroup, setTrainingGroup] = useState("");

    function validateForm() {
        return participant.length > 0 && trainingGroup.length > 0;
    }

    useEffect(() => {

        axiosInstance
            .get(`training/group/get`, {
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


const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
        .post(`training/group/participant/remove`, {
            participant: participant,
            trainingGroup: trainingGroup,
        })
        .then((res) => {
            //console.log(res)
            //console.log(res.data)
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
            localStorage.setItem('token_type', res.data.token_type);

        });
};

    return(
        <div className="addParticipant">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="text">
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
                    Usuń Użytkownika
                </Button>
            </Form>
        </div>
    );
}
export default TrainingGroupRemoveParticipant;