import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import coin_img from "../../imgs/coin_img.png"

function Oferta_cennik() {
    return (
            <div id="oferta-cennik" className="container mb-4">
                <div className="row text-center">
                    <div className="col-md-4">
                        <Card border="dark" style={{ width: '90%' }}>
                            <Card.Header><Card.Img variant="top" src={coin_img} /></Card.Header>
                            <Card.Body>
                                <Card.Title as={"h3"}>Starter</Card.Title>
                                <Card.Text as={"h1"}>
                                    100 GymCoinów
                                </Card.Text>
                                <Card.Text as={"h2"}>
                                    20$
                                </Card.Text>
                                <Button variant="primary">Kup</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card border="dark" style={{ width: '90%' }}>
                            <Card.Header><Card.Img variant="top" src={coin_img} /></Card.Header>
                            <Card.Body>
                                <Card.Title as={"h3"}>Classic</Card.Title>
                                <Card.Text as={"h1"}>
                                    200 GymCoinów
                                </Card.Text>
                                <Card.Text as={"h2"}>
                                    40$
                                </Card.Text>
                                <Button variant="primary">Kup</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card border="dark" style={{ width: '90%' }}>
                            <Card.Header><Card.Img variant="top" src={coin_img} /></Card.Header>
                            <Card.Body>
                                <Card.Title as={"h3"}>Premium</Card.Title>
                                <Card.Text as={"h1"}>
                                    300 GymCoinów
                                </Card.Text>
                                <Card.Text as={"h2"}>
                                    60$
                                </Card.Text>
                                <Button variant="primary">Kup</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
    );
}

export default Oferta_cennik;
