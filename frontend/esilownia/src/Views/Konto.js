import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../components/Axios/axios";

function Konto() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [joindate, setJoindate] = useState("");

    useEffect(() => {

        axiosInstance
            .get(`users/info/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + " " + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                console.log(res)
                console.log(res.data)

                setEmail(res.data.email)
                setUsername(res.data.username)
                setFirstname(res.data.first_name)
                setLastname(res.data.last_name)
                setJoindate(res.data.start_date.slice(0,10))

            });

    },[]);

    return (
        <div className="konto">
            <div class="container">
                <div class="row align-items-center my-5">
                    <div class="col-lg-7">
                        <img
                            class="img-fluid rounded mb-4 mb-lg-0"
                            src="https://riotopgym.pl/wp-content/uploads/2020/06/IMG-3651.jpg"
                            alt=""
                        />
                    </div>
                    <div class="col-lg-5">
                        <h1 class="font-weight-light">Konto</h1>

                            <p>Dane :</p>
                            <p>Username : {username}</p>
                            <p>Imie : {firstname}</p>
                            <p>Nazwisko : {lastname}</p>
                            <p>Mail : {email}</p>
                            <p>Data dołaczenia : {joindate}</p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Konto;