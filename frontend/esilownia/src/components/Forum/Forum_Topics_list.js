import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import Button from "react-bootstrap/Button";
import axios_variebles from "../Axios/Axios_variebles";

function ForumTopicsList() {

    const [topicsList, setTopicsList] = useState([])
    const [userList, setUserList] = useState([])
    const [newTopic, setNewTopic] = useState('')
    const [newTopicDescription, setNewTopicDescription] = useState('')

    useEffect(() => {

        axiosInstance
            .post(`/forum/topic/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {

                res.data.map((topic)=>{

                    axiosInstance
                        .post(`/users/get/`, {id: topic.owner},{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                            }
                        })
                        .then((res) => {
                            setUserList(userList => [...userList, res.data])
                        });

                })

                setTopicsList(res.data)
            });

    },[]);

    const handleSubmitData = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));

        var formdata = new FormData();
        formdata.append("title", newTopic);
        formdata.append("body", newTopicDescription);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "forum/topic/create", requestOptions)
            .then(response => response.text())
            .then(result => {
                window.location.reload();
            })
            .catch(error => console.log('error', error));
    }

    const handleDeleteTopic = (e) => {
        e.preventDefault();
        console.log(e.target.id)
    }

    return (
        <div className="forumTopicsList">
            <div className="container">

                <div className='row'>
                    <div className='col'>

                        <div className="text-center">
                            <hr></hr>
                            <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Dodaj
                                Temat</h1>
                            <hr></hr>
                        </div>


                        <div className='container border justify-content-center p-3'>
                            <div className='row justify-content-center'>
                            <div className="col-sm-4 p-1">
                                <div className="col-sm-12">
                                    <h6 className="mb-0">Nazwa Tematu</h6>
                                </div>
                                <div className="col-sm-12 text-secondary">
                                    <input type="text" className="form-control form-control-sm" placeholder='Nazwa'
                                           onChange={(e) => setNewTopic(e.target.value)}/>
                                </div>
                            </div>

                            <div className="col-sm-8 p-1">
                                <div className="col-sm-12">
                                    <h6 className="mb-0">Opis Tematu</h6>
                                </div>
                                <div className="col-sm-12 text-secondary">
                                    <input type="text" className="form-control form-control-sm" placeholder='Opis'
                                           onChange={(e) => setNewTopicDescription(e.target.value)}/>
                                </div>
                            </div>
                            </div>


                            <div className="col pt-2 pb-2">
                                    <Button onClick={handleSubmitData} variant="btn" size="sm">Utwórz</Button>
                            </div>

                        </div>

                    </div>
                </div>

                <div className='container'>
                    <div className='row border justify-content-center'>

                        {topicsList.map((topic)=>{
                            return (
                                <div className='col-sm-11 card m-2 p-2'>
                                    <div className="card-body">

                                    <h1>Temat : {topic.title}</h1>

                                        <br/>
                                        <div className='row justify-content-between'>
                                            {userList.map((user)=>{
                                                if(user.id === topic.owner){
                                                    return(
                                                        <p className='col-sm-3 align-self-end text-center'>User : {user.first_name} {user.last_name}</p>
                                                    )
                                                }
                                            })}

                                            <p className='col-sm-3 align-self-end text-center'>Data : {topic.date}</p>
                                        </div>
                                    </div>
                                    {userList.map((user)=>{
                                    if(user.id === topic.owner){
                                        return (
                                            <div>
                                                <Button id={'x'} onClick={handleDeleteTopic.bind(this)} variant="btn" size="sm">Usuń temat</Button>
                                            </div>
                                        )
                                    }
                                    })}
                                </div>
                            )
                        })}

                    </div>
                </div>

            </div>
        </div>
    );
}

export default ForumTopicsList;