import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../Axios/axios';
import {useHistory, Link} from "react-router-dom";
import PasswordStrength from "./PasswordStrength";
import zxcvbn from "zxcvbn";

// scrypt do sily hasla

function Register_form() {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rep_password, setRep_password] = useState("");
    const [login, setLogin] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");



    function validateForm() {
        return email.length > 0 && password.length > 0 && login.length > 0 && firstname.length > 0 && lastname.length > 0 && rep_password.length > 0 && password === rep_password && zxcvbn(password).score >= 2;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(login)
        //console.log(firstname)
        //console.log(lastname)
        //console.log(email)
        //console.log(password)
        //console.log(rep_password)

        axiosInstance
            .post(`users/register/`, {
                email: email,
                username: login,
                password: password,
                first_name: firstname,
                last_name: lastname
            })
            .then((res) => {

                //console.log(res);
                //console.log(res.data);
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
                    <PasswordStrength password={password} />
                </Form.Group>

                <Form.Group size="lg" controlId="rep_password">
                    <Form.Label>Powtorz Haslo</Form.Label>
                    <Form.Control
                        type="password"
                        value={rep_password}
                        onChange={(e) => setRep_password(e.target.value)}
                    />
                </Form.Group>

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