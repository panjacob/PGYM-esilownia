import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import gymcoin from "../../imgs/gymcoin.png";
import gymcoin2 from "../../imgs/gymcoin2.png";
import gymcoin3 from "../../imgs/gymcoin3.png";
import axiosInstance from "../Axios/Axios";


function Price_list_offer() {

    const [offerData, setOfferData] = useState([])
    const [offerDataPrice1, setOfferDataPrice1] = useState('')
    const [offerDataPrice2, setOfferDataPrice2] = useState('')
    const [offerDataPrice3, setOfferDataPrice3] = useState('')
    const [offerDataCoins1, setOfferDataCoins1] = useState('')
    const [offerDataCoins2, setOfferDataCoins2] = useState('')
    const [offerDataCoins3, setOfferDataCoins3] = useState('')
    const [offerDataStripePriceId1, setOfferDataStripePriceId1] = useState('')
    const [offerDataStripePriceId2, setOfferDataStripePriceId2] = useState('')
    const [offerDataStripePriceId3, setOfferDataStripePriceId3] = useState('')


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
                setOfferDataStripePriceId1(res.data[0].stripe_price_id)
                setOfferDataStripePriceId2(res.data[1].stripe_price_id)
                setOfferDataStripePriceId3(res.data[2].stripe_price_id)
            });
    }, []);

    const buyCoins = (stripe_price_id) => {
        if (localStorage.getItem('token_type') == null || localStorage.getItem('access_token') == null) {
            alert("Musisz być zalogowany, aby dokonać zakupu.");
            return;
        }
        axiosInstance
            .post(`/payment/create_checkout_session`, {
                'stripeprice': stripe_price_id
            }, {
                headers: {
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                window.open(res.data.url);
            })
    };

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

                            <Card border="dark" style={{width: '90%'}} className="mx-auto shadow-lg mt-1 mb-1 bg-light">
                                <Card.Header><Card.Img variant="top" src={gymcoin}/></Card.Header>
                                <Card.Body>
                                    <Card.Title as={"h3"}>Starter</Card.Title>
                                    <hr width="35%" color="black"/>
                                    <Card.Text as={"h1"}>
                                        <i>{offerDataCoins1} GymCoinów</i>
                                    </Card.Text>
                                    <hr width="35%" color="black"/>
                                    <Card.Text as={"h2"}>
                                        <b><i>{offerDataPrice1}zł</i></b>
                                    </Card.Text>

                                    <Button variant="btn" onClick={() => buyCoins(offerDataStripePriceId1)}>
                                        Kup
                                    </Button>
                                </Card.Body>
                            </Card>

                        </div>
                        <div className="col-md-4">

                            <Card border="dark" style={{width: '90%'}}
                                  className="mx-auto shadow-lg container-t container-t2 mt-1 mb-1 bg-light">
                                <Card.Header><Card.Img variant="top" src={gymcoin2}/></Card.Header>
                                <Card.Body>
                                    <Card.Title as={"h3"}>Classic</Card.Title>
                                    <hr width="35%" color="black"/>
                                    <Card.Text as={"h1"}>
                                        <i>{offerDataCoins2} GymCoinów</i>
                                    </Card.Text>
                                    <hr width="35%" color="black"/>
                                    <Card.Text as={"h2"}>
                                        <b><i>{offerDataPrice2}zł</i></b>
                                    </Card.Text>

                                    <Button variant="btn" onClick={() => buyCoins(offerDataStripePriceId2)}>
                                        Kup
                                    </Button>

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
                                        <b><i>{offerDataPrice3}zł</i></b>
                                    </Card.Text>

                                    <Button variant="btn" onClick={() => buyCoins(offerDataStripePriceId3)}>
                                        Kup
                                    </Button>
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
