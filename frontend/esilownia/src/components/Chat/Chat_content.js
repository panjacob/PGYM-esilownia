import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import photo from '../../imgs/basic_profile_photo.jpg'
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import axios_variebles from "../Axios/Axios_variebles";

function ChatContent() {

    const [users, setUsers] = useState([])
    const [msgs, setMsgs] = useState([])
    const [msgToSend, setMsgToSend] = useState('')
    const [myId, setMyId] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {

        axiosInstance
            .post(`/users/info/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setMyId(res.data.id)
            });

        axiosInstance
            .post(`/message/users`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUsers([])

                res.data.map((user) => {
                    axiosInstance
                        .post(`/users/get/`, {id: user}, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                            }
                        })
                        .then((res2) => {
                            setUsers(users => [...users, res2.data])
                        });
                })
            });

    }, []);

    useEffect(() => {
        var objDiv2 = document.getElementById("msgBox");
        objDiv2.scrollTo(0, 1000000)
    }, [msgs]);

    function msToTime(t) {

        let time_send = new Date()
        time_send.setTime(t)
        let time_now = Date.now()
        let duration = time_now - time_send;

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

    function getMsgs(e) {
        console.log(e.currentTarget.id)

        setMsgToSend('')
        setUserId(e.currentTarget.id)
        setMsgs([]);

        axiosInstance
            .post(`/message/get`, {user: e.currentTarget.id, begin: 0, end: 1000}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                res.data.messages.map((message) => {
                    setMsgs(msgs => [...msgs, message])
                })
            });



    }

    function sendMsg(){

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("receiver", userId);
        urlencoded.append("message", msgToSend);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL +  "message/send", requestOptions)
            .then(response => response.text())
            .then((result) => {
                setMsgs([]);

                setMsgToSend('')

                axiosInstance
                    .post(`/message/get`, {user: userId, begin: 0, end: 1000}, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                        }
                    })
                    .then((res) => {
                        res.data.messages.map((message) => {
                            setMsgs(msgs => [...msgs, message])
                        })
                    })
            })
            .catch(error => console.log('error', error));

    }

    return (
        <div className="chatContent">
            <div className="container">

                <div className='row mt-3 mb-3'>
                    <div className='col-lg-4 border' style={{overflowY: 'scroll', minHeight: '750px'}}>
                        {users.map((user, idx) => {
                            return (
                                <div key={idx} className='m-1 p-2 border'>
                                    <div id={user.id} onClick={getMsgs.bind(this)}>
                                        <div id='chat-user-wrapper'>
                                            <div id='chat-user-photo'>
                                                {(user.profile_photo === null) ? (
                                                    <img src={photo} alt="..." className="img-thumbnail" width='100px'
                                                         height='100px'/>
                                                ) : (
                                                    <img src={user.profile_photo} alt="..." className="img-thumbnail"
                                                         width='200px'
                                                         height='200px'/>
                                                )}
                                            </div>
                                            <div className='align-middle align-self-auto'
                                                 id='chat-user-name'>{user.first_name} {user.last_name} {user.id}</div>
                                            <div className='align-middle align-self-auto' id='chat-user-lastMsg'> lorem
                                                ipsum
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='col-lg-8 border'>

                        <div id='msgBox' style={{overflowY: 'scroll', minHeight: '675px', maxHeight:'675px'}}>
                            <div id='innerMsgBox'>
                            {msgs.map((msg, idx) => {
                                return (
                                    <div key={idx} className='m-1 p-1 border'>
                                        <p style={{margin: '0'}}>time : {msToTime(msg.time)}</p>
                                        <p style={{margin: '0'}}>sender : {msg.sender}</p>
                                        <p style={{margin: '0'}}>receiver : {msg.receiver}</p>
                                        <p style={{margin: '0'}}>message : {msg.message}</p>
                                    </div>
                                )
                            })}
                            </div>
                        </div>

                        <div className='pt-2 pb-2' style={{width:'100%', minHeight:'75px'}}>

                            <div className='row border pt-2 pb-2 my-auto mx-auto'>
                                <div className='col-9'>
                                    <Form.Control
                                        type="text"
                                        value={msgToSend}
                                        onChange={(e) => setMsgToSend(e.target.value)}
                                    />
                                </div>
                                <div className='col-3 text-center'>
                                    <Button onClick={sendMsg}>Wyślij</Button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default ChatContent;