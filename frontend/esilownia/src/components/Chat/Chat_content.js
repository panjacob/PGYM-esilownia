import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import photo from '../../imgs/basic_profile_photo.jpg'

function ChatContent() {

    const [users, setUsers] = useState([])
    const [msgs, setMsgs] = useState([])

    useEffect(() => {

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

    function getMsgs(e) {
        console.log(e.currentTarget.id)
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


        document.getElementById('msgBox').innerHTML = ''

    }

    return (
        <div className="chatContent">
            <div className="container">

                <div className='row mt-3 mb-3'>
                    <div className='col-lg-4 border' style={{minHeight: '750px'}}>
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
                                            <div className='align-middle align-self-auto' id='chat-user-name'>{user.first_name} {user.last_name}</div>
                                            <div className='align-middle align-self-auto' id='chat-user-lastMsg'> lorem ipsum</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div id='msgBox' className='col-lg-8 border' style={{minHeight: '750px'}}>
                        {msgs.map((msg, idx) => {
                            return (
                                <div key={idx} className='m-1 p-1 border'>
                                    <p style={{margin: '0'}}>time : {msg.time}</p>
                                    <p style={{margin: '0'}}>sender : {msg.sender}</p>
                                    <p style={{margin: '0'}}>receiver : {msg.receiver}</p>
                                    <p style={{margin: '0'}}>message : {msg.message}</p>
                                </div>
                            )
                        })}

                    </div>
                </div>

            </div>
        </div>
    );
}

export default ChatContent;