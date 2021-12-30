import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import AccountNotificationsAll from "./Account_notifications_all";
import {Button, Form} from "react-bootstrap";
import axios_variebles from "../Axios/Axios_variebles";

function Account_data() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [bankAcc, setBankAcc] = useState("");
    const [joindate, setJoindate] = useState("");
    const [getCheckout, setGetCheckout] = useState("");
    const [checkoutMoney, setCheckoutMoney] = useState("");

    let isDietician = false;
    let isTrainer = false;
    if (localStorage.getItem('role') !== null) {
        isDietician = JSON.parse(localStorage.getItem('role')).includes('dietician')
    }
    if (localStorage.getItem('role') !== null) {
        isTrainer = JSON.parse(localStorage.getItem('role')).includes('trainer')
    }

    function validateForm() {
        return checkoutMoney > 0;
    }

    useEffect(() => {

        axiosInstance
            .post(`users/info/`, {},{
                headers: {
            'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
        }
            })
            .then((res) => {
                setEmail(res.data.email)
                setUsername(res.data.username)
                setFirstname(res.data.first_name)
                setLastname(res.data.last_name)
                setBankAcc(res.data.bank_account)
                setGetCheckout(res.data.money)
                setJoindate(res.data.start_date.slice(0, 10))
            });


    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("amount", checkoutMoney);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "payment/withdraw/create", requestOptions)
            .then(response => {
                response.text();
                window.location.reload();
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }

    return (
        <div className="account_data">

            <div className="col-md-8 mx-auto mt-3">

                <div className="card mb-3 bg-light">

                    <div className="card-body">

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Username</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {username}
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Imie</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {firstname}
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Nazwisko</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {lastname}
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Mail</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {email}
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Konto Bankowe</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {(bankAcc !== null) ? (
                                        <div>{bankAcc}</div>
                                    ) :
                                    ( ' Brak danych ' )
                                }
                            </div>
                        </div>
                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Data dołaczenia</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {joindate}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <AccountNotificationsAll></AccountNotificationsAll>

            {(isTrainer === true || isDietician === true) ? (
                <div className="checkout">
                    <div className="row justify-content-center">
                        <div className="text-center">
                            <hr></hr>
                            <h1 style={{"fontSize": "4vw"}} className="display-1 font-weight-light mb-4">Wypłać Gymcoiny
                            </h1>
                            <hr></hr>
                        </div>
                        <div className="col-md-6">
                            <Form className="p-4">
                                <Form.Group size="lg" controlId="number" onSubmit={handleSubmit}>
                                    <Form.Label>Ilość</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={checkoutMoney}
                                        placeholder={getCheckout}
                                        max={getCheckout}
                                        min={0}
                                        onChange={(e) => setCheckoutMoney(e.target.value)}
                                    />
                                </Form.Group>
                                <Button onClick={handleSubmit} block size="lg" className="btn btn-lg" id="btn-login"
                                        disabled={!validateForm()}>
                                    Wypłać
                                </Button>
                                <hr/>
                            </Form>
                        </div>
                    </div>
                </div>
            ) : ("")
            }

        </div>
    );
}

export default Account_data;