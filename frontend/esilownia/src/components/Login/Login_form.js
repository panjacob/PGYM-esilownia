import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../Axios/Axios';
import axios_variebles from '../Axios/Axios_variebles';
import {useHistory, Link} from "react-router-dom";

function Login_form() {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance
            .post(`auth/token/`, {
                grant_type: 'password',
                username: email,
                password: password,
                client_id: axios_variebles.client_id,
                client_secret: axios_variebles.client_secret,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                localStorage.setItem('token_type', res.data.token_type);

                history.push('/dashboard');
                window.location.reload();
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setLoginMessage('Błędny login lub hasło');
                }
            });
    };

    return (
        <div className="login_form">

            <Form onSubmit={handleSubmit}>

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
                </Form.Group>
                <p className="alert alert-danger">{loginMessage}</p>

                <Button onClick={handleSubmit} block size="lg" className="btn btn-lg mb-4 mt-4" id="btn-login" type="submit"
                        disabled={!validateForm()}>
                    Zaloguj
                </Button>

                <p>Nie masz konta? <Link to="/register">Zarejestruj się!</Link></p>
                <p>Nie możesz się zalogować? <Link to="/password_reset">Zresetuj hasło</Link></p>

            </Form>

        </div>
    );
}

export default Login_form;