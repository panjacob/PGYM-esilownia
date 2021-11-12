import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TrainingCreate(){
    
    const [date_start, setDateStart] = useState("");
    const [date_end, setDateEnd] = useState("");
    const [difficulity, setDifficulity] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [trainingGroup, setTrainingGroup] = useState("");
    const [calories, setCalories] = useState("");

    function validateForm() {
        return  trainingGroup.length > 0 && date_start.length > 0 && date_end.length > 0 && difficulity.length > 0 && title.length > 0 && description.length > 0 && calories.length > 0;
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
        .post(`training/create`, {
            date_start: date_start,
            date_end: date_end,
            difficulity: difficulity,
            title: title,
            description: description,
            calories: calories,
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
        <div className="createTraining">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="date">
                    <Form.Label>Data rozpoczęcia</Form.Label>
                    <Form.Control
                        autoFocus
                        type="date"
                        value={date_start}
                        onChange={(e) => setDateStart(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="date">
                    <Form.Label>Data zakończenia</Form.Label>
                    <Form.Control
                        autoFocus
                        type="date"
                        value={date_end}
                        onChange={(e) => setDateEnd(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="text">
                    <Form.Label>Grupa Trenignowa</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={trainingGroup}
                        onChange={(e) => setTrainingGroup(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="text">
                    <Form.Label>Stopień Zaawansowania</Form.Label>
                    <Form.Control
                        type="text"
                        value={difficulity}
                        onChange={(e) => setDifficulity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="text">
                    <Form.Label>Tytuł</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="text">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="text">
                    <Form.Label>Typ</Form.Label>
                    <Form.Control
                        type="text"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                    />
                </Form.Group>
                <Button onClick={handleSubmit} block size="lg" className="btn btn-lg" id="btn-login" type="submit"
                        disabled={!validateForm()}>
                    Utwórz Grupę
                </Button>
            </Form>
        </div>
    );
}
export default TrainingCreate;