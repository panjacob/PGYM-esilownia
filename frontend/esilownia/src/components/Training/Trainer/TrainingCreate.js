import React, {useEffect, useState} from "react";
import axiosInstance from "../../Axios/Axios";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";


function TrainingCreate(props){
    const [groupInfo, setGroupInfo] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [calories, setCalories] = useState("")

    useEffect(() => {

        axiosInstance
            .post(`training/group/get`, {id: props.groupId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setGroupInfo(res.data)
            });

    }, [props.groupId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        var urlencoded = new URLSearchParams();
        urlencoded.append("training_group", groupInfo.id);
        urlencoded.append("title", title);
        urlencoded.append("description", description);
        urlencoded.append("date_start", dateStart);
        urlencoded.append("date_end", dateEnd);
        urlencoded.append("calories", calories);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/training/create", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        window.location.reload()
    };

    function validateForm() {
        return title.length > 0 && description.length > 0 && dateStart.length > 0 && dateEnd.length > 0 && calories > 0;
    }

    return(
        <div className="TrainingCreateContainer">
            <hr/>
            <h1 style={{"fontSize": "4vw"}} className="display-1 font-weight-light mb-4">Utwórz trening</h1>
            <hr/>
            <div className="container text-left">
                <div className="row">
                    <div className="col-md-12">
                    <Form className="border p-4" onSubmit={handleSubmit}>
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
                            <Form.Label>Data Rozpoczęcia</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={dateStart}
                                onChange={(e) => setDateStart(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="text">
                            <Form.Label>Data Zakonczenia</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={dateEnd}
                                onChange={(e) => setDateEnd(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Label>Kalorie</Form.Label>
                        <Form.Control
                            type="number"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                        />
                        <Button onClick={handleSubmit} block size="lg" className="btn btn-lg mt-4" id="btn-login"
                                disabled={!validateForm()}>
                            Utwórz Trening
                        </Button>
                    </Form>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default TrainingCreate;