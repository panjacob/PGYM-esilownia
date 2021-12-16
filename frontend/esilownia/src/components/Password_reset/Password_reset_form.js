import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import zxcvbn from 'zxcvbn';
import axiosInstance from '../Axios/Axios';
import Register_Password_Strength from "../Register/Register_Password_Strength";

function PasswordResetForm() {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rep_password, setRep_password] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(new URLSearchParams(window.location.search).get('token'));
    })

    const handleRequestSubmit = (e) => {
        e.preventDefault();

        axiosInstance
            .post(`users/password_reset_request/`, {
                email: email
            })
            .then((res) => {
                alert("Na podany email zostały wysłane instrukcje dotyczące resetu hasła.");
            });
    }

    const handleChangeSubmit = (e) => {
        e.preventDefault();

        axiosInstance
            .post(`users/password_reset/`, {
                token: token,
                password: password
            })
            .then((res) => {
                alert("Hasło zostało pomyślnie zmienione.");
                history.push('/login');
                window.location.reload();
            });
    }

    const emailWarning = () => {
        if (email.length > 0) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(email).toLowerCase())) {
                return '';
            } else {
                return 'Błędny E-mail'
            }
        }
    }

    const passWarning = () => {
        if (password.length > 0) {
            switch (zxcvbn(password).score) {
                case 0:
                    return 'Zbyt słabe hasło';
                case 1:
                    return 'Zbyt słabe hasło';
                case 2:
                    return '';
                case 3:
                    return '';
                case 4:
                    return '';
                default:
                    return '';
            }
        }
    }

    const rep_pasWarning = () => {
        if (rep_password.length > 0) {
            if (password !== rep_password) {
                return 'Hasła się nie zgadzają';
            } else {
                return '';
            }
        }
    }

    const validateRequestForm = () => {
        return emailWarning()==='';
    }

    const validateChangeForm = () => {
        return (passWarning()==='' && rep_pasWarning()==='');
    }

    if (token == null)
        return (
            <div className="password_reset_form">

                <Form onSubmit={handleRequestSubmit}>

                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <div className="warnings">
                        <p className="alert alert-danger">{emailWarning()}</p>
                    </div>

                    <Button onClick={handleRequestSubmit} block size="lg" type="submit" className="btn btn-lg" id="btn-login"
                            disabled={!validateRequestForm()}>
                        Zresetuj Hasło
                    </Button>

                </Form>

            </div>
        )
    else
        return (
            <div className="password_reset_form">

                <Form onSubmit={handleChangeSubmit}>

                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Nowe Hasło</Form.Label>
                        <Form.Control
                            autoFocus
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Register_Password_Strength password={password}/>
                    </Form.Group>

                    <Form.Group size="lg" controlId="rep_password">
                        <Form.Label>Powtórz Nowe Hasło</Form.Label>
                        <Form.Control
                            type="password"
                            value={rep_password}
                            onChange={(e) => setRep_password(e.target.value)}
                        />
                    </Form.Group>

                    <div className="warnings">
                        <p className="alert alert-danger">{passWarning()}</p>
                        <p className="alert alert-danger">{rep_pasWarning()}</p>
                    </div>

                    <Button onClick={handleChangeSubmit} block size="lg" type="submit" className="btn btn-lg" id="btn-login"
                            disabled={!validateChangeForm()}>
                        Zmień Hasło
                    </Button>

                </Form>

            </div>
        );
}

export default PasswordResetForm;
