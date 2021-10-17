import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

function Register_form() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
  
    function validateForm() {
      return email.length > 0 && password.length > 0 && login.length > 0 && firstname.length > 0 && lastname.length > 0;
    }
  
    function handleSubmit(event) {
      event.preventDefault();
    }
  
    const message = () => {
      console.log(login)
      console.log(firstname)
      console.log(lastname) 
      console.log(email)
      console.log(password)
     }

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
  <Form.Label>First Name</Form.Label>
  <Form.Control
    autoFocus
    type="text"
    value={firstname}
    onChange={(e) => setFirstname(e.target.value)}
  />
</Form.Group>

<Form.Group size="lg" controlId="Lastname">
  <Form.Label>Last Name</Form.Label>
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
  <Form.Label>Password</Form.Label>
  <Form.Control
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</Form.Group>

<Button onClick={message} block size="lg" type="submit" disabled={!validateForm()}>
  Register
</Button>
</Form>
    </div>
  );
}

export default Register_form;