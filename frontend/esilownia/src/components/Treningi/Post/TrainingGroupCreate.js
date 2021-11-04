import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TrainingGroupCreate(){
    
    const [date, setDate] = useState("");
    const [difficulity, setDifficulity] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");

    function validateForm() {
        return date.length > 0 && difficulity.length > 0 && title.length > 0 && description.length > 0 && type.length > 0;
    }


const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
        .post(`training/group/create`, {
            date: date,
            difficulity: difficulity,
            title: title,
            description: description,
            type: type,
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
        <div className="createGroup">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="date">
                    <Form.Label>Data</Form.Label>
                    <Form.Control
                        autoFocus
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="text">
                    <Form.Label>Stopień Zaawansowania</Form.Label>
                        <select class="form-select" aria-label="Default select example" onChange={(e)=> setDifficulity(e.target.value)}>
                            <option value="0">Łatwy</option>
                            <option value="1">Średni</option>
                            <option value="2">Zaawansowany</option>
                            <option value="3">Armagedon</option>
                        </select>
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
                        value={type}
                        onChange={(e) => setType(e.target.value)}
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
export default TrainingGroupCreate;