import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TrainingGroupCreate(){
    
    const [date, setDate] = useState("");
    const [difficulity, setDifficulity] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState([]);
    const [type2, setType2] = useState([]);
   
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
            type: type2,
        },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
        }
    })
    .then((res) => {
        console.log(res);
    });
};

useEffect(() => {

    axiosInstance
        .post(`training/group/type/all`, {},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
            }
        })
        .then((res) => {
            setType(res.data)
        })
        .catch(
            function (error) {
              alert(error)
              return Promise.reject(error)
            });
}, []);

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
                        <select class="form-select" onChange={(e)=> setDifficulity(e.target.value)}>
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
                    <select onChange={(e)=> setType2(e.target.value)}>
                        {type.map(function(cValue, idx){
                        return (<option value={cValue.id} key={idx}>{cValue.type}</option>)
                        })}
                    </select>
                </Form.Group>
                <Button onClick={handleSubmit} block size="lg" className="btn btn-lg" id="btn-login"
                        disabled={!validateForm()}>
                    Utwórz Grupę
                </Button>
            </Form>
        </div>
    );
}
export default TrainingGroupCreate;