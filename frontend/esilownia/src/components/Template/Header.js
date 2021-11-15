import React from "react";
import {withRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from "../Logout/Logout";
import {Container, Navbar, Nav, NavDropdown, NavItem} from 'react-bootstrap'
import logo from '../../imgs/coin_img.png'
import Notifications from "react-notifications-menu";

function Header(props) {

    const data = [
        {
            // zdjecie
            image: logo,
            // opis ktory sie wyswietla
            message: 'Lorem ipsum dolor sit amet1.',
            // opcjonalny href po kliknieciu w powiadomienie
            detailPage: '/events',
            // wyswietlany czas dostania
            receivedTime: '12h ago',
        },
        {
            image: logo,
            message: 'Lorem ipsum dolor sit amet2.',
            detailPage: '/events',
            receivedTime: '12h ago'
        }, {
            image: logo,
            message: 'Lorem ipsum dolor sit amet3.',
            detailPage: '/events',
            receivedTime: '12h ago'
        },
        {
            image: logo,
            message: 'Lorem ipsum dolor sit amet4.',
            detailPage: '/events',
            receivedTime: '12h ago'
        }
    ]


    let isModerator = false;
    if (localStorage.getItem('role') !== null) {
        isModerator = JSON.parse(localStorage.getItem('role')).includes('moderator')
    }

    return (
        <div className="navigation">
            <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
                <Container>

                    <Navbar.Brand href="/">E-Siłownia</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {
                                localStorage.getItem('access_token') ?
                                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                    : <Nav.Link href="/">Home</Nav.Link>
                            }
                            <Nav.Link href="/o_nas">O nas</Nav.Link>
                            <Nav.Link href="/cennik">Cennik</Nav.Link>
                            <Nav.Link href="/kadra">Kadra</Nav.Link>
                            {
                                localStorage.getItem('access_token') ?
                                    <Nav.Link href="/treningi">Treningi</Nav.Link>
                                    : ""
                            }
                            {
                                localStorage.getItem('access_token') ?
                                    <Nav.Link href="/dieta">Dieta</Nav.Link>
                                    : ""
                            }
                        </Nav>
                        {
                            localStorage.getItem('access_token') ? (
                                <Nav className="ml-auto">
                                    <NavDropdown title="Konto" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/konto">Moje konto</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="/konto_edycja">Edytuj konto</NavDropdown.Item>
                                        <NavDropdown.Item href="/">Dane płatnicze</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        {
                                            (isModerator === true) ? (

                                                < NavDropdown.Item href="/cockpit">Kokpit</NavDropdown.Item>
                                            ) : ("")
                                        }
                                    </NavDropdown>
                                    <Nav.Link>
                                        <Notifications
                                            data={data}
                                            cardOption={data => console.log(data)}
                                            markAsRead={data => {console.log('mar')}}
                                            viewAllBtn={{text:'Pokaż wszystkie',onClick: ()=>{}}}
                                            header={
                                                {
                                                    title: 'Notifications',
                                                    option: {
                                                        text: 'Zaznacz wszystkie jako przeczytane', onClick: () => {console.log(data)}
                                                    }
                                                }
                                            }
                                        />
                                    </Nav.Link>
                                    <Nav.Link><Logout></Logout></Nav.Link>
                                </Nav>
                            ) : (
                                <Nav className="ml-auto">
                                    <Nav.Link href="/login">Login</Nav.Link>
                                    <Nav.Link href="/register">Register</Nav.Link>
                                </Nav>
                            )
                        }
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </div>
    );
}

export default withRouter(Header);
