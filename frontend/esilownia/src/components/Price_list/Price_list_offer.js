import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import gymcoin from "../../imgs/gymcoin.png";
import gymcoin2 from "../../imgs/gymcoin2.png";
import gymcoin3 from "../../imgs/gymcoin3.png";

function Price_list_offer() {

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
                                        <i>100 GymCoinów</i>
                                    </Card.Text>
                                    <hr width="35%" color="black"/>
                                    <Card.Text as={"h2"}>
                                        <b><i>20$</i></b>
                                    </Card.Text>
                                    <Button variant="primary" id="btn-login">Kup</Button>
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
                                        <i>200 GymCoinów</i>
                                    </Card.Text>
                                    <hr width="35%" color="black"/>
                                    <Card.Text as={"h2"}>
                                        <b><i>40$</i></b>
                                    </Card.Text>
                                    <Button variant="primary" id="btn-login">Kup</Button>
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
                                        <i>300 GymCoinów</i>
                                    </Card.Text>
                                    <hr width="35%" color="black"/>
                                    <Card.Text as={"h2"}>
                                        <b><i>60$</i></b>
                                    </Card.Text>
                                    <Button variant="primary" id="btn-login">Kup</Button>
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
