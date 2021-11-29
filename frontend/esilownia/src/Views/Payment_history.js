import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../components/Axios/Axios";
import {Link} from "react-router-dom";

function PaymentHistory() {

    const [transactionInfo, setTransactionInfo] = useState([])

    useEffect(() => {

        axiosInstance
            .post(`/payment/transaction/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTransactionInfo(res.data)
            });

    }, []);

    function msToTime(t) {

        let time_send = new Date()
        time_send.setTime(t)
        let time_now = Date.now()
        let duration = time_now - time_send;

        var minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
            days = Math.floor((duration / (1000 * 60 * 60 * 24)));

        if (hours === 0 && minutes === 0) {
            return 'Chwilę temu';
        }
        if (hours === 0) {
            return minutes + " min. temu";
        }
        if (days === 0) {
            return hours + " godz. temu";
        }
        if (hours > 24) {
            if (days === 1) {
                return days + " dzień temu"
            } else {
                return days + " dni temu"
            }
        }
    }

    return (
        <div className="paymentHistory">
            <div className="container">

                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Spis transakcji</h1>
                    <hr></hr>
                </div>

                <div className="container" style={{overflowY: 'scroll', flex: '1', height: '500px'}}>
                    {transactionInfo.map((transaction) => {
                        return (
                            <div className="card mb-3 bg-light">
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-sm-5">
                                            <h6 className="mb-0">Id transakcji</h6>
                                        </div>
                                        <div className="col-sm-7 text-secondary">
                                            {transaction.transaction_id}
                                        </div>
                                    </div>
                                    <hr/>

                                    <div className="row">
                                        <div className="col-sm-5">
                                            <h6 className="mb-0">Kwota</h6>
                                        </div>
                                        <div className="col-sm-7 text-secondary">
                                            {transaction.payed} $
                                        </div>
                                    </div>
                                    <hr/>

                                    <div className="row">
                                        <div className="col-sm-5">
                                            <h6 className="mb-0">Zakup</h6>
                                        </div>
                                        <div className="col-sm-7 text-secondary">
                                            {transaction.purchased} GymCoin
                                        </div>
                                    </div>
                                    <hr/>

                                    <div className="row">
                                        <div className="col-sm-5">
                                            <h6 className="mb-0">Czas</h6>
                                        </div>
                                        <div className="col-sm-7 text-secondary">
                                            {msToTime(transaction.time)}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default PaymentHistory;