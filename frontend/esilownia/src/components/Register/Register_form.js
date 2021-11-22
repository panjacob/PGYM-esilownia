import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../Axios/Axios';
import {useHistory, Link} from "react-router-dom";
import Register_Password_Strength from "./Register_Password_Strength";
import zxcvbn from "zxcvbn";
import RegisterNotifications from "./Register_Notifications";

function Register_form() {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rep_password, setRep_password] = useState("");
    const [login, setLogin] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const testResult = zxcvbn(password);

    const passWarning = () => {
        if (password.length > 0) {
            switch (testResult.score) {
                case 0:
                    return false;
                case 1:
                    return false;
                case 2:
                    return true;
                case 3:
                    return true;
                case 4:
                    return true;
                default:
                    return true;
            }
        }
    }

    const emailWarnign = () => {
        if (email.length > 0) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(email).toLowerCase())) {
                return true;
            } else {
                return false;
            }
        }
    }

    const rep_pasWarning = () => {
        if (rep_password.length > 0) {
            if (password !== rep_password) {
                return false;
            } else {
                return true;
            }
        }
    }

    const loginWarnign = () => {
        if (login.length > 0) {
            if (login.length < 2) {
                return false
            } else {
                return true;
            }
        }
    }

    const firstnameWarnign = () => {
        if (firstname.length > 0) {
            const re = /^[\s\p{L}]+$/u;
            if (re.test(String(firstname).toLowerCase())) {
                return true;
            } else {
                return false
            }
        }
    }

    const lastnameWarnign = () => {
        if (lastname.length > 0) {
            const re = /^[\s\p{L}]+$/u;
            if (re.test(String(lastname).toLowerCase())) {
                return true;
            } else {
                return false
            }
        }
    }

    // DLA TESTOW BY NIE WYMYSLAC INPUTOW
    // function validateForm() {
    //     return email.length > 0 && password.length > 0 && login.length > 0 && firstname.length > 0 && lastname.length > 0 && rep_password.length > 0 && password === rep_password && zxcvbn(password).score >= 2;
    // }

    // POPRWANA WALIDACJA DLA WERSJI KONCOWEJ
    function validateForm() {
        return loginWarnign()===true && firstnameWarnign()===true && lastnameWarnign()===true && emailWarnign()===true && passWarning()===true && rep_pasWarning()===true && firstname.length > 0 && lastname.length > 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance
            .post(`users/register/`, {
                email: email,
                username: login,
                password: password,
                first_name: firstname,
                last_name: lastname
            })
            .then((res) => {
                history.push('/login');
            });
    };

    return (
        <div className="login_form">

            <Form onSubmit={handleSubmit}>

                <Form.Group size="lg" controlId="Login">
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </Form.Group>

                <Form.Group size="lg" controlId="Firstname">
                    <Form.Label>Imie</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </Form.Group>

                <Form.Group size="lg" controlId="Lastname">
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </Form.Group>

                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group size="lg" controlId="password">
                    <Form.Label>Haslo</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Register_Password_Strength password={password}/>
                </Form.Group>

                <Form.Group size="lg" controlId="rep_password">
                    <Form.Label>Powtorz Haslo</Form.Label>
                    <Form.Control
                        type="password"
                        value={rep_password}
                        onChange={(e) => setRep_password(e.target.value)}
                    />
                </Form.Group>

                <RegisterNotifications email={email} password={password} rep_password={rep_password} login={login}
                                       firstname={firstname} lastname={lastname}></RegisterNotifications>

                <Button onClick={handleSubmit} block size="lg" type="submit" className="btn btn-lg" id="btn-login"
                        disabled={!validateForm()}>
                    Zarejestruj
                </Button>
                Masz już konto? <Link to="/login">Zaloguj się!</Link>

            </Form>

        </div>
    );
}

export default Register_form;