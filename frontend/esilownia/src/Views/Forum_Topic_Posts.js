import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../components/Axios/Axios";
import {Link, useLocation} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {BsShield} from "react-icons/bs";

function ForumTopicPosts() {

    const [topicData, setTopicData] = useState([])
    const [postList, setPostList] = useState([])
    const [userList, setUserList] = useState([])

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

    },[]);

    function uniqBy(a, key) {
        var seen = {};
        return a.filter(function (item) {
            var k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        })
    }

    return (
        <div className="forumTopicPosts">
            <div className="container">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wrapper wrapper-content animated fadeInRight">

                                <div className="p-2 pl-4 mb-2 mt-2 border shadow">
                                    {JSON.stringify(topicData)}
                                </div>

                                <div className="forum-container border shadow">

                                    <div className="forum-title">
                                        <h3>Posty</h3>
                                    </div>

                                    {postList.map((post) => {
                                        return (
                                            <div className="forum-item">

                                                <div className="row align-middle">

                                                    <div className="col-md-1">
                                                        <div className="forum-icon align-middle">
                                                            <BsShield className='mid-icon'></BsShield>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        {uniqBy(userList, JSON.stringify).map((user)=>{
                                                            if(user.id === post.owner){
                                                                return (
                                                                    <div className="forum-item-title">{user.first_name} {user.last_name}</div>
                                                                )
                                                            }
                                                        })}
                                                        <div className="forum-sub-title">{post.body}</div>
                                                    </div>
                                                    <div className='col-md-2'>
                                                        <div className="forum-sub-title">{post.date}</div>
                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    })}


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