import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import {useLocation} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import axios_variebles from "../Axios/Axios_variebles";

function Account_data() {

    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation()

    function validateForm() {
        return message.length > 0;
    }

    useEffect(() => {
        const search = location.search;
        const id = new URLSearchParams(search).get('id');

        axiosInstance
            .post(`users/get/`, {id:id},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUserId(res.data.id)
            });


    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("receiver", userId);
        formdata.append("message", message);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "message/send", requestOptions)
            .then(response => {
                response.text();
                window.location.reload();
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    return (
        <div className="usermessage">
            <div className="row justify-content-center">
                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "4vw"}} className="display-1 font-weight-light mb-4">Wyślij Wiadomość
                    </h1>
                    <hr></hr>
                </div>
                <div className="col-md-6">
                    <Form className="p-4">
                        <Form.Group size="lg" controlId="text" onSubmit={handleSubmit}>
                            <Form.Control
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </Form.Group>
                        <Button onClick={handleSubmit} block size="lg" className="btn btn-lg" id="btn-login" disabled={!validateForm()}>
                            Wyślij
                        </Button>
                        <hr/>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Account_data;