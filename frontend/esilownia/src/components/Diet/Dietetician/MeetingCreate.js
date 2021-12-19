import React, {useEffect, useState} from "react";
import axiosInstance from "../../Axios/Axios";
import axios_variebles from "../../Axios/Axios_variebles";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function MeetingCreate(props){
    const [dietInfo, setDietInfo] = useState([])
    const [title, setTitle] = useState("")
    const [dateStart, setDateStart] = useState("")

    useEffect(() => {

        axiosInstance
            .post(`diet/get`, {id: props.groupId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setDietInfo(res.data)
            });

    }, [props.groupId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        var urlencoded = new URLSearchParams();
        urlencoded.append("diet", dietInfo.id);
        urlencoded.append("title", title);
        urlencoded.append("date", dateStart);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "diet/meeting/add", requestOptions)
            .then(response => {
                response.text();
                window.location.reload();
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    };

    function validateForm() {
        return title.length > 0 && dateStart.length > 0;
    }

    return(
        <div className="TrainingCreateContainer">
            <hr/>
            <h1 style={{"fontSize": "4vw"}} className="display-1 font-weight-light mb-4">Utwórz Spotkanie</h1>
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
                                <Form.Label>Data Rozpoczęcia</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    value={dateStart}
                                    onChange={(e) => setDateStart(e.target.value)}
                                />
                            </Form.Group>
                            <Button onClick={handleSubmit} block size="lg" className="btn btn-lg mt-4" id="btn-login"
                                    disabled={!validateForm()}>
                                Utwórz Spotkanie
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default MeetingCreate;