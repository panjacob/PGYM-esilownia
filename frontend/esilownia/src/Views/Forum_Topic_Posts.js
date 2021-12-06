import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../components/Axios/Axios";
import {Link, useLocation} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {BsShield, BsShieldFill} from "react-icons/bs";
import axios_variebles from "../components/Axios/Axios_variebles";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

function ForumTopicPosts() {

    const [topicData, setTopicData] = useState([])
    const [topicDate, setTopicDate] = useState('')
    const [postList, setPostList] = useState([])
    const [userList, setUserList] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const [newPostDescription, setNewPostDescription] = useState('')

    const location = useLocation()

    useEffect(() => {

        setPostList([]);
        axiosInstance
            .post(`/forum/topic/get`, {id: location.state.topicId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTopicData(res.data)
                    setTopicDate(res.data.date)

                res.data.posts.map((post)=>{
                    axiosInstance
                        .post(`/forum/post/get`, {id: post}, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                            }
                        })
                        .then((res2) => {
                            setPostList( postList => [...postList,res2.data])

                            axiosInstance
                                .post(`/users/get/`, {id: res2.data.owner}, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                                    }
                                })
                                .then((res3) => {
                                    setUserList(userList => [...userList, res3.data])
                                });

                            })
                        });
                });

        axiosInstance
            .post(`/users/info/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setCurrentUser(res.data)
            });

    },[]);

    function uniqBy(a, key) {
        var seen = {};
        return a.filter(function (item) {
            var k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        })
    }

    const handleSubmitData = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));

        var formdata = new FormData();
        formdata.append("topic_id", topicData.id);
        formdata.append("body", newPostDescription);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "forum/post/create", requestOptions)
            .then(response => response.text())
            .then(result => {
                setNewPostDescription('')
                window.location.reload();
            })
            .catch(error => console.log('error', error));
    }

    const handleDeletePost = (e) => {
        e.preventDefault();
        //console.log(e.target.id)
        let id = e.target.id
        //console.log(id)

        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token'));

        var formdata = new FormData();
        formdata.append("id", id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(axios_variebles.baseURL + "forum/post/remove", requestOptions)
            .then(response => response.text())
            .then(result => {
                window.location.reload()
            })
            .catch(error => console.log('error', error));
    }
    const handleEditPost = (e) => {
        e.preventDefault();
        console.log(e.target.id)
    }

    return (
        <div className="forumTopicPosts">
            <div className="container">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wrapper wrapper-content animated fadeInRight">

                                <div className="p-2 pl-4 mb-2 mt-2 border shadow">
                                    <div className="forum-item">

                                        <div className="row align-middle">

                                            <div className="col-md-1">
                                                <div className="forum-icon align-middle">
                                                    <BsShieldFill className='mid-icon'></BsShieldFill>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="forum-item-title">{topicData.title}</div>
                                                <div className="forum-sub-title">{topicData.body}</div>
                                            </div>
                                            <div className='col-md-3'>
                                                {uniqBy(userList, JSON.stringify).map((user,idx)=>{
                                                    if(user.id === topicData.owner){
                                                        return (
                                                            <div key={idx} className="forum-sub-title">{user.first_name} {user.last_name}</div>
                                                        )
                                                    }
                                                })}
                                                <div className="forum-sub-title">{topicDate.replace('T', " ").substr(0, 19)}</div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className="forum-container border shadow">

                                    <div className="forum-title">
                                        <h3>Posty</h3>
                                    </div>
                                    {postList.sort(function(a, b) {
                                        var c = new Date(a.date);
                                        var d = new Date(b.date);
                                        return c-d;
                                    }).map((post,idx) => {
                                        return (
                                            <div key={idx} className="forum-item">

                                                <div className="row align-middle">

                                                    <div className="col-md-1">
                                                        <div className="forum-icon align-middle">
                                                            <BsShield className='mid-icon'></BsShield>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        {uniqBy(userList, JSON.stringify).map((user,idx)=>{
                                                            if(user.id === post.owner){
                                                                return (
                                                                    <div key={idx} className="forum-post-title">{user.first_name} {user.last_name}</div>
                                                                )
                                                            }
                                                        })}
                                                        <div className="forum-post-body">{post.body}</div>
                                                    </div>
                                                    <div className='col-md-3'>
                                                        <div className="forum-sub-title">{post.date.replace('T', " ").replace('Z', '').substr(0, 19)}</div>
                                                    </div>

                                                </div>

                                                {(currentUser.id === post.owner) ? (
                                                    <div>
                                                        <Button className='m-1' id={post.id} onClick={handleEditPost} variant="btn" size="md"><AiFillEdit/></Button>
                                                        <Button className='m-1' id={post.id} onClick={handleDeletePost} variant="btn" size="md"><BsFillTrashFill/></Button>
                                                    </div>
                                                ) : ('')}

                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="p-2 pl-4 mb-2 mt-2 border shadow">
                                    <div className="pull-left m-r-md">
                                        <div className='row'>
                                            <div className='col'>

                                                <h2>Dodaj Post</h2>


                                                <div className='container border justify-content-center p-3'>
                                                    <div className='row justify-content-center'>

                                                        <div className="col-sm-12 p-1">
                                                            <div className="col-sm-12">
                                                                <h6 className="mb-0">Zawartosc Postu</h6>
                                                            </div>
                                                            <div className="col-sm-12 text-secondary">
                                                                <input type="text" className="form-control form-control-sm" placeholder='Opis'
                                                                       onChange={(e) => setNewPostDescription(e.target.value)}/>
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className="col pt-2 pb-2">
                                                        <Button onClick={handleSubmitData} variant="btn" size="sm">Utwórz</Button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );

}

export default ForumTopicPosts;