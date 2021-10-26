import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import gymcoin from "../../imgs/gymcoin.png";
import gymcoin2 from "../../imgs/gymcoin2.png";
import gymcoin3 from "../../imgs/gymcoin3.png";

function Oferta_cennik() {
    return (
        <div id="oferta-cennik" className="container mb-4">
            <div className="row text-center">
                <div className="col-md-4">
                    <Card border="dark" style={{width: '80%'}} className="mx-auto">
                        <Card.Header><Card.Img variant="top" src={gymcoin}/>Najlepsze na start</Card.Header>
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
                    <Card border="dark" style={{width: '80%'}} className="mx-auto">
                        <Card.Header><Card.Img variant="top" src={gymcoin2}/>Najczęściej wybierany</Card.Header>
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
                    <Card border="dark" style={{width: '80%'}} className="mx-auto">
                        <Card.Header><Card.Img variant="top" src={gymcoin3}/>Najbardziej opłacalny</Card.Header>
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
    );
}

export default Oferta_cennik;
