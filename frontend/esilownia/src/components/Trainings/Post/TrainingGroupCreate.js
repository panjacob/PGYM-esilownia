import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TrainingGroupCreate() {

    const [date, setDate] = useState("");
    const [difficulity, setDifficulity] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState([]);
    const [typeSelected, setTypeSelected] = useState([]);

    function validateForm() {
        return date.length > 0 && difficulity.length > 0 && title.length > 0 && description.length > 0 && type.length > 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(typeSelected)

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("date", date);
        urlencoded.append("difficulity", difficulity);
        urlencoded.append("title", title);
        urlencoded.append("description", description);
        urlencoded.append("type", typeSelected[0]);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/training/group/create", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    };

    useEffect(() => {

        axiosInstance
            .post(`training/group/type/all`, {}, {
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

    const typesChecked = (e) => {

        if(typeSelected.indexOf(e.target.name) !== -1) {
            let name = e.target.name;
            setTypeSelected(typeSelected.filter((e)=>(e !== name)))
        } else {
            let name = e.target.name;
            setTypeSelected([...typeSelected,name]);
        }

    }

    const selectedDifficulty = (e) => {
        console.log(e.target.value);
        setDifficulity(e.target.value)
    }

    return (
        <div className="createGroup">

            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Stwórz grupe treningową</h1>
                <hr></hr>
            </div>

            <Form className="border p-4" onSubmit={handleSubmit}>
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
                    <div onChange={selectedDifficulty.bind(this)}>
                        <div className="mx-2">
                            <input type="radio" value="0"
                                   name="application_role"/> Łatwy
                        </div>
                        <div className="mx-2">
                            <input type="radio" value="1"
                                   name="application_role"/> Średni
                        </div>
                        <div className="mx-2">
                            <input type="radio" value="2"
                                   name="application_role"/> Zaawansowany
                        </div>
                        <div className="mx-2">
                            <input type="radio" value="3"
                                   name="application_role"/> Armagedon
                        </div>
                    </div>
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
                        as="textarea"
                        rows={3}
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="text">
                    <Form.Label>Typ</Form.Label>
                        {type.map((types) => (
                            <div key={`inline-checkbox-${types.id}`} className="mb-3">
                                <Form.Check
                                    inline
                                    name={types.id}
                                    type="checkbox"
                                    onChange={typesChecked.bind(this)}
                                    id={`inline-checkbox-${types.id}`}
                                /> {types.type}
                            </div>
                        ))}
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