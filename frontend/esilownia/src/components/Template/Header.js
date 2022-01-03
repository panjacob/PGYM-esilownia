import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from "../Logout/Logout";
import {Container, Navbar, Nav, NavDropdown, NavItem} from 'react-bootstrap'
import logo from '../../imgs/coin_img.png'
import Notifications from "react-notifications-menu";
import axiosInstance from "../Axios/Axios"
import bell from "../../imgs/bell-2-24.png";

import bought from '../../imgs/notifications/bought.jpg'
import accepted from '../../imgs/notifications/accepted.jpg'
import denied from '../../imgs/notifications/denied.png'
import diet from '../../imgs/notifications/diet.jpg'
import training from '../../imgs/notifications/training.png'


function Header(props) {

    const [data, setData] = useState([])

    const data2 = [{x:1},{x:1}]

    function msToTime(duration) {
        var seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
            days = Math.floor((duration / (1000 * 60 * 60 * 24)));

        if (hours === 0 && minutes === 0) {
            return seconds + " sec. temu";
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

    useEffect(() => {

        if(localStorage.getItem('access_token') !== null) {

        axiosInstance
            .post(`/message/notification/all`, {show_seen: 'False'}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                    setData([])
                    res.data.map((notification) => {
                        let time_send = new Date()
                        time_send.setTime(notification.time)
                        let time_now = Date.now()
                        let time = time_now - time_send;

                        let obj = {}

                        if(notification.kind === '0') {
                            obj = {
                                id: notification.id,
                                kind: notification.kind,
                                image: logo,
                                message: JSON.parse( notification.body ).message,
                                detailPage: '#',
                                receivedTime: msToTime(time)
                            }
                        }

                        if(notification.kind === '1') {
                            obj = {
                                id: notification.id,
                                kind: notification.kind,
                                image: accepted,
                                message:  JSON.parse( notification.body ).message,
                                detailPage: '#',
                                receivedTime: msToTime(time)
                            }
                        }

                        if(notification.kind === '2') {
                            obj = {
                                id: notification.id,
                                kind: notification.kind,
                                image: denied,
                                message:  JSON.parse( notification.body ).message,
                                detailPage: '#',
                                receivedTime: msToTime(time)
                            }
                        }

                        if(notification.kind === '4') {
                            obj = {
                                id: notification.id,
                                kind: notification.kind,
                                image: training,
                                message:  JSON.parse( notification.body ).message,
                                detailPage: '#',
                                receivedTime: msToTime(time)
                            }
                        }

                        if(notification.kind === '5') {
                            obj = {
                                id: notification.id,
                                kind: notification.kind,
                                image: bought,
                                message:  JSON.parse( notification.body ).message,
                                detailPage: '#',
                                receivedTime: msToTime(time)
                            }
                        }

                        if(notification.kind === '6') {
                            obj = {
                                id: notification.id,
                                kind: notification.kind,
                                image: diet,
                                message:  JSON.parse( notification.body ).message,
                                detailPage: '#',
                                receivedTime: msToTime(time)
                            }
                        }

                        if(notification.kind === '7') {
                            obj = {
                                id: notification.id,
                                kind: notification.kind,
                                image: bought,
                                message:  JSON.parse( notification.body ).message,
                                detailPage: '#',
                                receivedTime: msToTime(time)
                            }
                        }

                        setData(data => [...data, obj])
                    })
            });

        let y = document.createElement('span')
        y.innerHTML = 'Zobacz wszystkie';
        y.onclick = function () {
            window.location.href = '/konto'
        };
        let x = document.getElementsByClassName('see-all')
            x[0].appendChild(y);
        }

    }, []);

    function markSeen(data){
        //console.log(data)
        axiosInstance
            .post(`/message/notification/seen`, {id: data.id}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {

                axiosInstance
                    .post(`/message/notification/all`, {show_seen: 'False'}, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                        }
                    })
                    .then((res) => {
                        setData([])
                        res.data.map((notification) => {
                            let time_send = new Date()
                            time_send.setTime(notification.time)
                            let time_now = Date.now()
                            let time = time_now - time_send;

                            let obj = {}

                            if(notification.kind === '0') {
                                obj = {
                                    id: notification.id,
                                    kind: notification.kind,
                                    image: logo,
                                    message: JSON.parse( notification.body ).message,
                                    detailPage: '#',
                                    receivedTime: msToTime(time)
                                }
                            }

                            if(notification.kind === '1') {
                                obj = {
                                    id: notification.id,
                                    kind: notification.kind,
                                    image: accepted,
                                    message:  JSON.parse( notification.body ).message,
                                    detailPage: '#',
                                    receivedTime: msToTime(time)
                                }
                            }

                            if(notification.kind === '2') {
                                obj = {
                                    id: notification.id,
                                    kind: notification.kind,
                                    image: denied,
                                    message:  JSON.parse( notification.body ).message,
                                    detailPage: '#',
                                    receivedTime: msToTime(time)
                                }
                            }

                            if(notification.kind === '4') {
                                obj = {
                                    id: notification.id,
                                    kind: notification.kind,
                                    image: training,
                                    message:  JSON.parse( notification.body ).message,
                                    detailPage: '#',
                                    receivedTime: msToTime(time)
                                }
                            }

                            if(notification.kind === '5') {
                                obj = {
                                    id: notification.id,
                                    kind: notification.kind,
                                    image: bought,
                                    message:  JSON.parse( notification.body ).message,
                                    detailPage: '#',
                                    receivedTime: msToTime(time)
                                }
                            }

                            if(notification.kind === '6') {
                                obj = {
                                    id: notification.id,
                                    kind: notification.kind,
                                    image: diet,
                                    message:  JSON.parse( notification.body ).message,
                                    detailPage: '#',
                                    receivedTime: msToTime(time)
                                }
                            }

                            if(notification.kind === '7') {
                                obj = {
                                    id: notification.id,
                                    kind: notification.kind,
                                    image: bought,
                                    message:  JSON.parse( notification.body ).message,
                                    detailPage: '#',
                                    receivedTime: msToTime(time)
                                }
                            }

                            setData(data => [...data, obj])
                        })
                    });

            });


    }

    function markAllSeen(data){
        data.map((notification)=>{
            //console.log(data)
            //console.log(notification)
            axiosInstance
                .post(`/message/notification/seen`, {id: notification.id}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                    }
                })
                .then((res) => {

                    axiosInstance
                        .post(`/message/notification/all`, {show_seen: 'False'}, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                            }
                        })
                        .then((res) => {
                            setData([])
                            res.data.map((notification) => {
                                let time_send = new Date()
                                time_send.setTime(notification.time)
                                let time_now = Date.now()
                                let time = time_now - time_send;

                                let obj = {}

                                if(notification.kind === '0') {
                                    obj = {
                                        id: notification.id,
                                        kind: notification.kind,
                                        image: logo,
                                        message: JSON.parse( notification.body ).message,
                                        detailPage: '#',
                                        receivedTime: msToTime(time)
                                    }
                                }

                                if(notification.kind === '1') {
                                    obj = {
                                        id: notification.id,
                                        kind: notification.kind,
                                        image: accepted,
                                        message:  JSON.parse( notification.body ).message,
                                        detailPage: '#',
                                        receivedTime: msToTime(time)
                                    }
                                }

                                if(notification.kind === '2') {
                                    obj = {
                                        id: notification.id,
                                        kind: notification.kind,
                                        image: denied,
                                        message:  JSON.parse( notification.body ).message,
                                        detailPage: '#',
                                        receivedTime: msToTime(time)
                                    }
                                }

                                if(notification.kind === '4') {
                                    obj = {
                                        id: notification.id,
                                        kind: notification.kind,
                                        image: training,
                                        message:  JSON.parse( notification.body ).message,
                                        detailPage: '#',
                                        receivedTime: msToTime(time)
                                    }
                                }

                                if(notification.kind === '5') {
                                    obj = {
                                        id: notification.id,
                                        kind: notification.kind,
                                        image: bought,
                                        message:  JSON.parse( notification.body ).message,
                                        detailPage: '#',
                                        receivedTime: msToTime(time)
                                    }
                                }

                                if(notification.kind === '6') {
                                    obj = {
                                        id: notification.id,
                                        kind: notification.kind,
                                        image: diet,
                                        message:  JSON.parse( notification.body ).message,
                                        detailPage: '#',
                                        receivedTime: msToTime(time)
                                    }
                                }

                                if(notification.kind === '7') {
                                    obj = {
                                        id: notification.id,
                                        kind: notification.kind,
                                        image: bought,
                                        message:  JSON.parse( notification.body ).message,
                                        detailPage: '#',
                                        receivedTime: msToTime(time)
                                    }
                                }

                                setData(data => [...data, obj])
                            })
                        });

                });
        })
    }

    let isModerator = false;
    if (localStorage.getItem('role') !== null) {
        isModerator = JSON.parse(localStorage.getItem('role')).includes('moderator')
    }
    let isTrainer = false;
    if (localStorage.getItem('role') !== null) {
        isTrainer = JSON.parse(localStorage.getItem('role')).includes('trainer')
    }

    let isDietician = false;
    if (localStorage.getItem('role') !== null) {
        isDietician = JSON.parse(localStorage.getItem('role')).includes('dietician')
    }

    return (
        <div className="navigation">
            <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark" id="navbar_home">
                <Container>

                    <Navbar.Brand href="/">PGYM</Navbar.Brand>
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
                                    <>{(isTrainer === true) ? (
                                        <Nav.Link href="/strefa_trenera">Treningi</Nav.Link>
                                        ) : (
                                            <Nav.Link href="/treningi">Treningi</Nav.Link>
                                        )}</>
                                    : ""
                            }
                            {
                                localStorage.getItem('access_token') ?
                                    <>{(isDietician === true) ? (
                                        <Nav.Link href="/strefa_dietetyka">Dieta</Nav.Link>
                                    ) : (
                                        <Nav.Link href="/dieta">Dieta</Nav.Link>
                                    )}
                                    </>
                                    : ""

                            }
                            {
                                localStorage.getItem('access_token') ?
                                    <Nav.Link href="/forum">Forum</Nav.Link>
                                    : ""
                            }
                        </Nav>
                        {
                            localStorage.getItem('access_token') ? (
                                <Nav className="ml-auto">
                                    <NavDropdown title="Konto" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/konto">Moje konto</NavDropdown.Item>
                                        <NavDropdown.Item href="/wiadomości">Wiadomości</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="/konto_edycja">Edytuj konto</NavDropdown.Item>
                                        <NavDropdown.Item href="/historia_płatności">Historia Płatności</NavDropdown.Item>
                                        <NavDropdown.Item href="/zgłoszenia">Zgłoszenia</NavDropdown.Item>
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
                                            cardOption={data => markSeen(data)}
                                            viewAllBtn={{
                                                text: '', linkTo: '/konto'
                                            }}
                                            header={
                                                {
                                                    title: 'Notifications',
                                                    option: {
                                                        text: 'Zaznacz wszystkie jako przeczytane', onClick: () => {
                                                            markAllSeen(data);
                                                        }
                                                    }
                                                }
                                            }
                                            icon={bell}
                                        />
                                    </Nav.Link>
                                    <Nav.Link><Logout></Logout></Nav.Link>
                                </Nav>
                            ) : (
                                <Nav className="ml-auto">
                                    <Nav.Link href="/login">Zaloguj</Nav.Link>
                                    <Nav.Link href="/register">Zarejestruj</Nav.Link>
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
