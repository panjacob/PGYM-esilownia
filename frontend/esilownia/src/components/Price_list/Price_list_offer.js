import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import gymcoin from "../../imgs/gymcoin.png";
import gymcoin2 from "../../imgs/gymcoin2.png";
import gymcoin3 from "../../imgs/gymcoin3.png";
import axiosInstance from "../Axios/Axios";
import axios_variebles from "../Axios/Axios_variebles";

function Price_list_offer() {

    const [offerData, setOfferData] = useState([])
    const [offerDataPrice1, setOfferDataPrice1] = useState('')
    const [offerDataPrice2, setOfferDataPrice2] = useState('')
    const [offerDataPrice3, setOfferDataPrice3] = useState('')
    const [offerDataCoins1, setOfferDataCoins1] = useState('')
    const [offerDataCoins2, setOfferDataCoins2] = useState('')
    const [offerDataCoins3, setOfferDataCoins3] = useState('')

    const [modal1Show, setModal1Show] = React.useState(false);
    const [modal2Show, setModal2Show] = React.useState(false);
    const [modal3Show, setModal3Show] = React.useState(false);

    useEffect(() => {

        axiosInstance
            .post(`/payment/offer/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setOfferData(res.data)
                setOfferDataPrice1(res.data[0].price)
                setOfferDataPrice2(res.data[1].price)
                setOfferDataPrice3(res.data[2].price)
                setOfferDataCoins1(res.data[0].coins)
                setOfferDataCoins2(res.data[1].coins)
                setOfferDataCoins3(res.data[2].coins)
            });

    }, []);

    const handlePayment = (e) => {
        e.preventDefault();

        console.log(e.target.name)

        var urlencoded = new URLSearchParams();
        urlencoded.append("offer", e.target.name);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "payment/transaction/create", requestOptions)
            .then(response => response.text())
            .then(result => {
                window.location.href="/cennik";
            })
            .catch(error => console.log('error', error));


    };

    function Offer1(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Panel Płatności
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Starter</h4>
                    <p>Coins : {offerDataCoins1}</p>
                    <p>Price : ${offerDataPrice1}</p>
                    <Button variant="primary" name='1' id="btn-login" onClick={handlePayment}>Kup</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function Offer2(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Panel Płatności
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Classic</h4>
                    <p>Coins : {offerDataCoins2}</p>
                    <p>Price : ${offerDataPrice2}</p>
                    <Button variant="primary" name='2' id="btn-login" onClick={handlePayment}>Kup</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function Offer3(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Panel Płatności
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Premium</h4>
                    <p>Coins : {offerDataCoins3}</p>
                    <p>Price : ${offerDataPrice3}</p>
                    <Button variant="primary" name='3' id="btn-login" onClick={handlePayment}>Kup</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div id="price_list_offer">
            <div className="container mb-4">

                <div className="row justify-content-center my-5">

                    <div className="container text-center">
                        <hr></hr>
                        <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Cennik</h1>
                        <hr></hr>
                    </div>

                    <div className="row text-center">
                        <div className="col-md-4">

                            <Card border="dark" style={{width: '90%'}} className="mx-auto shadow-lg mt-1 mb-1 bg-light" >
                                <Card.Header><Card.Img variant="top" src={gymcoin}/></Card.Header>
                                <Card.Body>
                                    <Card.Title as={"h3"}>Starter</Card.Title>
                                    <hr width="35%" color="black"/>
                                    <Card.Text as={"h1"}>
                                        <i>{offerDataCoins1} GymCoinów</i>
                                    </Card.Text>
                                    <hr width="35%" color="black"/>
                                    <Card.Text as={"h2"}>
                                        <b><i>${offerDataPrice1}</i></b>
                                    </Card.Text>

                                    <Button variant="btn" onClick={() => setModal1Show(true)}>
                                        Kup
                                    </Button>

                                    <Offer1
                                        show={modal1Show}
                                        onHide={() => setModal1Show(false)}
                                    />
                                </Card.Body>
                            </Card>

                        </div>
                        <div className="col-md-4">

                            <Card border="dark" style={{width: '90%'}} className="mx-auto shadow-lg container-t container-t2 mt-1 mb-1 bg-light">
                                <Card.Header><Card.Img variant="top" src={gymcoin2}/></Card.Header>
                                <Card.Body>
                                    <Card.Title as={"h3"}>Classic</Card.Title>
                                    <hr width="35%" color="black"/>
                                    <Card.Text as={"h1"}>
                                        <i>{offerDataCoins2} GymCoinów</i>
                                    </Card.Text>
                                    <hr width="35%" color="black"/>
                                    <Card.Text as={"h2"}>
                                        <b><i>${offerDataPrice2}</i></b>
                                    </Card.Text>

                                    <Button variant="btn" onClick={() => setModal2Show(true)}>
                                        Kup
                                    </Button>

                                    <Offer2
                                        show={modal2Show}
                                        onHide={() => setModal2Show(false)}
                                    />
                                </Card.Body>
                            </Card>

                        </div>
                        <div className="col-md-4">

                            <Card border="dark" style={{width: '90%'}} className="mx-auto shadow-lg mt-1 mb-1 bg-light">
                                <Card.Header><Card.Img variant="top" src={gymcoin3}/></Card.Header>
                                <Card.Body>
                                    <Card.Title as={"h3"}>Premium</Card.Title>
                                    <hr width="35%" color="black"/>
                                    <Card.Text as={"h1"}>
                                        <i>{offerDataCoins3} GymCoinów</i>
                                    </Card.Text>
                                    <hr width="35%" color="black"/>
                                    <Card.Text as={"h2"}>
                                        <b><i>${offerDataPrice3}</i></b>
                                    </Card.Text>

                                    <Button variant="btn" onClick={() => setModal3Show(true)}>
                                        Kup
                                    </Button>

                                    <Offer3
                                        show={modal3Show}
                                        onHide={() => setModal3Show(false)}
                                    />
                                </Card.Body>
                            </Card>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Price_list_offer;
