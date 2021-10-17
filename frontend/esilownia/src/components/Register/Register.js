import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register_form from "../Register/Register_form"

function Register() {

  return (
    <div className="Register">
      <div class="container">
        <div class="row d-flex justify-content-center my-5">
            <Register_form></Register_form>
        </div>
      </div>
    </div>
  );
}

export default Register;
