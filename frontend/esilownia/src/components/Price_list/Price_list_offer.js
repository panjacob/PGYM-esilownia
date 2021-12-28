import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, FormControl, InputGroup, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import gymcoin from "../../imgs/gymcoin.png";
import gymcoin2 from "../../imgs/gymcoin2.png";
import gymcoin3 from "../../imgs/gymcoin3.png";
import axiosInstance from "../Axios/Axios";
import axios_variebles from "../Axios/Axios_variebles";
import Form from "react-bootstrap/Form";
import { AiFillLock, AiFillCreditCard } from "react-icons/ai";
import { BsFillPersonFill, BsCalendarFill } from "react-icons/bs";


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

    const [modal1Show, setModal1Show] = React.useState(false);
    const [modal2Show, setModal2Show] = React.useState(false);
    const [modal3Show, setModal3Show] = React.useState(false);

    const [cardNumber, setCardNumber] = useState('**** **** **** ****')
    const [cardHolderName, setCardHolderName] = useState('Imie')
    const [cardHolderSurname, setCardHolderSurname] = useState('Nazwisko')
    const [cardExpireMonth, setCardExpireMonth] = useState('MM')
    const [cardExpireYear, setCardExpireYear] = useState('RR')
    const [cardCCV, setCardCCV] = useState('***')


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

    // const getStripePK = () => {
    //     return axiosInstance
    //         .post(`/payment/stripepk`, {}, {
    //             headers: {
    //                 'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
    //             }
    //         })
    // }

    // const buyCoins = (stripe_price_id) => {
    //     if (localStorage.getItem('token_type') == null || localStorage.getItem('access_token') == null) {
    //         alert("Musisz być zalogowany, aby dokonać zakupu.");
    //         return;
    //     }
    //     createStripeCheckoutSession(stripe_price_id);
    // };

    // const handlePayment = (e) => {
    //     e.preventDefault();

    //     console.log(e.target.name)

    //     var urlencoded = new URLSearchParams();
    //     urlencoded.append("offer", e.target.name);

    //     urlencoded.append("cardNumber", document.getElementById('cardNumberInput').value);
    //     urlencoded.append("cardHolderName", document.getElementById('cardHolderNameInput').value);
    //     urlencoded.append("cardHolderSurname", document.getElementById('cardHolderSurnameInput').value);
    //     urlencoded.append("cardExpireMonth", document.getElementById('cardExpireMonthInput').value);
    //     urlencoded.append("cardExpireYear", document.getElementById('cardExpireYearInput').value);
    //     urlencoded.append("cardCCV", document.getElementById('cardCCVInput').value);


    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));
    //     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: urlencoded,
    //         redirect: 'follow'
    //     };

    //     fetch(axios_variebles.baseURL + "payment/transaction/create", requestOptions)
    //         .then(response => response.text())
    //         .then(result => {
    //             if(JSON.parse( result ).message === 'Transakcja zakończona poprawnie') {
    //                 //window.location.href = "/cennik";
    //             } else {
    //                 alert('Transakcja nieudana')
    //             }
    //             window.location.reload()
    //         })
    //         .catch(error => console.log('error', error));

    // };

    // function Offer1(props) {
    //     return (
    //         <Modal
    //             {...props}
    //             size="lg"
    //             aria-labelledby="contained-modal-title-vcenter"
    //             centered
    //         >
    //             <Modal.Header closeButton>
    //                 <Modal.Title id="contained-modal-title-vcenter">
    //                     Panel Płatności
    //                 </Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <h4>Starter</h4>
    //                 <p>GymCoiny : {offerDataCoins1}</p>
    //                 <p>Cena : ${offerDataPrice1}</p>

    //                 <div className='row justify-content-center'>
    //                     <div className='border p-2 m-1' style={{width:'70%'}}>
    //                     <div className='row'>
    //                         <div className='col'>
    //                             <Form.Label htmlFor="cardNumberInput" visuallyHidden>
    //                                 Numer Karty
    //                             </Form.Label>
    //                             <InputGroup className="mb-2">
    //                                 <InputGroup.Text><AiFillCreditCard/></InputGroup.Text>
    //                                 <FormControl id="cardNumberInput" placeholder={cardNumber}/>
    //                             </InputGroup>
    //                         </div>
    //                     </div>
    //                     <div className='row'>
    //                         <div className='col'>
    //                             <Form.Label htmlFor="cardHolderNameInput" visuallyHidden>
    //                                 Imie
    //                             </Form.Label>
    //                             <InputGroup className="mb-2">
    //                                 <InputGroup.Text><BsFillPersonFill/></InputGroup.Text>
    //                                 <FormControl id="cardHolderNameInput" placeholder={cardHolderName}/>
    //                             </InputGroup>
    //                         </div>
    //                         <div className='col'>
    //                             <Form.Label htmlFor="cardHolderSurnameInput" visuallyHidden>
    //                                 Nazwisko
    //                             </Form.Label>
    //                             <InputGroup className="mb-2">
    //                                 <InputGroup.Text><BsFillPersonFill/></InputGroup.Text>
    //                                 <FormControl id="cardHolderSurnameInput" placeholder={cardHolderSurname}/>
    //                             </InputGroup>
    //                         </div>
    //                     </div>
    //                     <div className='row'>
    //                         <div className='col'>
    //                             <Form.Label htmlFor="cardExpireMonthInput" visuallyHidden>
    //                                 MM
    //                             </Form.Label>
    //                             <InputGroup className="mb-2">
    //                                 <InputGroup.Text><BsCalendarFill/></InputGroup.Text>
    //                                 <FormControl id="cardExpireMonthInput" placeholder={cardExpireMonth}/>
    //                             </InputGroup>
    //                         </div>
    //                         <div className='col'>
    //                             <Form.Label htmlFor="cardExpireYearInput" visuallyHidden>
    //                                 YY
    //                             </Form.Label>
    //                             <InputGroup className="mb-2">
    //                                 <InputGroup.Text><BsCalendarFill/></InputGroup.Text>
    //                                 <FormControl id="cardExpireYearInput" placeholder={cardExpireYear}/>
    //                             </InputGroup>
    //                         </div>
    //                         <div className='col'>
    //                             <Form.Label htmlFor="cardCCVInput" visuallyHidden>
    //                                 Kod CCV
    //                             </Form.Label>
    //                             <InputGroup className="mb-2">
    //                                 <InputGroup.Text><AiFillLock/></InputGroup.Text>
    //                                 <FormControl id="cardCCVInput" placeholder={cardCCV}/>
    //                             </InputGroup>
    //                         </div>
    //                     </div>
    //                     </div>
    //                 </div>

    //                 <Button variant="primary" name='1' id="btn-login" onClick={handlePayment}>Kup</Button>
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button onClick={props.onHide}>Zamknij</Button>
    //             </Modal.Footer>
    //         </Modal>
    //     )
    //         ;
    // }

    // function Offer2(props) {
    //     return (
    //         <Modal
    //             {...props}
    //             size="lg"
    //             aria-labelledby="contained-modal-title-vcenter"
    //             centered
    //         >
    //             <Modal.Header closeButton>
    //                 <Modal.Title id="contained-modal-title-vcenter">
    //                     Panel Płatności
    //                 </Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <h4>Classic</h4>
    //                 <p>GymCoiny : {offerDataCoins2}</p>
    //                 <p>Cena : ${offerDataPrice2}</p>

    //                 <div className='row justify-content-center'>
    //                     <div className='border p-2 m-1' style={{width:'70%'}}>
    //                         <div className='row'>
    //                             <div className='col'>
    //                                 <Form.Label htmlFor="cardNumberInput" visuallyHidden>
    //                                     Numer Karty
    //                                 </Form.Label>
    //                                 <InputGroup className="mb-2">
    //                                     <InputGroup.Text><AiFillCreditCard/></InputGroup.Text>
    //                                     <FormControl maxLength='16' id="cardNumberInput" placeholder={cardNumber}/>
    //                                 </InputGroup>
    //                             </div>
    //                         </div>
    //                         <div className='row'>
    //                             <div className='col'>
    //                                 <Form.Label htmlFor="cardHolderNameInput" visuallyHidden>
    //                                     Imie
    //                                 </Form.Label>
    //                                 <InputGroup className="mb-2">
    //                                     <InputGroup.Text><BsFillPersonFill/></InputGroup.Text>
    //                                     <FormControl id="cardHolderNameInput" placeholder={cardHolderName}/>
    //                                 </InputGroup>
    //                             </div>
    //                             <div className='col'>
    //                                 <Form.Label htmlFor="cardHolderSurnameInput" visuallyHidden>
    //                                     Nazwisko
    //                                 </Form.Label>
    //                                 <InputGroup className="mb-2">
    //                                     <InputGroup.Text><BsFillPersonFill/></InputGroup.Text>
    //                                     <FormControl id="cardHolderSurnameInput" placeholder={cardHolderSurname}/>
    //                                 </InputGroup>
    //                             </div>
    //                         </div>
    //                         <div className='row'>
    //                             <div className='col'>
    //                                 <Form.Label htmlFor="cardExpireMonthInput" visuallyHidden>
    //                                     MM
    //                                 </Form.Label>
    //                                 <InputGroup className="mb-2">
    //                                     <InputGroup.Text><BsCalendarFill/></InputGroup.Text>
    //                                     <FormControl id="cardExpireMonthInput" placeholder={cardExpireMonth}/>
    //                                 </InputGroup>
    //                             </div>
    //                             <div className='col'>
    //                                 <Form.Label htmlFor="cardExpireYearInput" visuallyHidden>
    //                                     YY
    //                                 </Form.Label>
    //                                 <InputGroup className="mb-2">
    //                                     <InputGroup.Text><BsCalendarFill/></InputGroup.Text>
    //                                     <FormControl id="cardExpireYearInput" placeholder={cardExpireYear}/>
    //                                 </InputGroup>
    //                             </div>
    //                             <div className='col'>
    //                                 <Form.Label htmlFor="cardCCVInput" visuallyHidden>
    //                                     Kod CCV
    //                                 </Form.Label>
    //                                 <InputGroup className="mb-2">
    //                                     <InputGroup.Text><AiFillLock/></InputGroup.Text>
    //                                     <FormControl id="cardCCVInput" placeholder={cardCCV}/>
    //                                 </InputGroup>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <Button variant="primary" name='2' id="btn-login" onClick={handlePayment}>Kup</Button>
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button onClick={props.onHide}>Zamknij</Button>
    //             </Modal.Footer>
    //         </Modal>
    //     );
    // }

    // function Offer3(props) {
    //     return (
    //         <Modal
    //             {...props}
    //             size="lg"
    //             aria-labelledby="contained-modal-title-vcenter"
    //             centered
    //         >
    //             <Modal.Header closeButton>
    //                 <Modal.Title id="contained-modal-title-vcenter">
    //                     Panel Płatności
    //                 </Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <h4>Premium</h4>
    //                 <p>GymCoiny : {offerDataCoins3}</p>
    //                 <p>Cena : ${offerDataPrice3}</p>

    //                 <div className='row justify-content-center'>
    //                     <div className='border p-2 m-1' style={{width:'70%'}}>
    //                         <div className='row'>
    //                             <div className='col'>
    //                                 <Form.Label htmlFor="cardNumberInput" visuallyHidden>
    //                                     Numer Karty
    //                                 </Form.Label>
    //                                 <InputGroup className="mb-2">
    //                                     <InputGroup.Text><AiFillCreditCard/></InputGroup.Text>
    //                                     <FormControl id="cardNumberInput" placeholder={cardNumber}/>
    //                                 </InputGroup>
    //                             </div>
    //                         </div>
    //                         <div className='row'>
    //                             <div className='col'>
    //                                 <Form.Label htmlFor="cardHolderNameInput" visuallyHidden>
    //                                     Imie
    //                                 </Form.Label>
    //                                 <InputGroup className="mb-2">
    //                                     <InputGroup.Text><BsFillPersonFill/></InputGroup.Text>
    //                                     <FormControl id="cardHolderNameInput" placeholder={cardHolderName}/>
    //                                 </InputGroup>
    //                             </div>
    //                             <div className='col'>
    //                                 <Form.Label htmlFor="cardHolderSurnameInput" visuallyHidden>
    //                                     Nazwisko
    //                                 </Form.Label>
    //                                 <InputGroup className="mb-2">
    //                                     <InputGroup.Text><BsFillPersonFill/></InputGroup.Text>
    //                                     <FormControl id="cardHolderSurnameInput" placeholder={cardHolderSurname}/>
    //                                 </InputGroup>
    //                             </div>
    //                         </div>
    //                         <div className='row'>
    //                             <div className='col'>
    //                                 <Form.Label htmlFor="cardExpireMonthInput" visuallyHidden>
    //                                     MM
    //                                 </Form.Label>
    //                                 <InputGroup className="mb-2">
    //                                     <InputGroup.Text><BsCalendarFill/></InputGroup.Text>
    //                                     <FormControl id="cardExpireMonthInput" placeholder={cardExpireMonth}/>
    //                                 </InputGroup>
    //                             </div>
    //                             <div className='col'>
    //                                 <Form.Label htmlFor="cardExpireYearInput" visuallyHidden>
    //                                     YY
    //                                 </Form.Label>
    //                                 <InputGroup className="mb-2">
    //                                     <InputGroup.Text><BsCalendarFill/></InputGroup.Text>
    //                                     <FormControl id="cardExpireYearInput" placeholder={cardExpireYear}/>
    //                                 </InputGroup>
    //                             </div>
    //                             <div className='col'>
    //                                 <Form.Label htmlFor="cardCCVInput" visuallyHidden>
    //                                     Kod CCV
    //                                 </Form.Label>
    //                                 <InputGroup className="mb-2">
    //                                     <InputGroup.Text><AiFillLock/></InputGroup.Text>
    //                                     <FormControl id="cardCCVInput" placeholder={cardCCV}/>
    //                                 </InputGroup>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <Button variant="primary" name='3' id="btn-login" onClick={handlePayment}>Kup</Button>
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button onClick={props.onHide}>Zamknij</Button>
    //             </Modal.Footer>
    //         </Modal>
    //     );
    // }

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

                                    {/* <Offer1
                                        show={modal1Show}
                                        onHide={() => setModal1Show(false)}
                                    /> */}
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

                                    {/* <Offer2
                                        show={modal2Show}
                                        onHide={() => setModal2Show(false)}
                                    /> */}
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

                                    {/* <Offer3
                                        show={modal3Show}
                                        onHide={() => setModal3Show(false)}
                                    /> */}
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
