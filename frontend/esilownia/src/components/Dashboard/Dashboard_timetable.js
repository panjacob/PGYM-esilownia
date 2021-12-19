import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import profilePicture from "../../imgs/basic_profile_photo.jpg";
import axios_variebles from "../Axios/Axios_variebles";
import {Table} from "react-bootstrap";

function Dashboard_timetable() {

    const [userTrainings, setUserTrainings] = useState([])

    useEffect(() => {

        setUserTrainings([])

        axiosInstance
            .post(`users/info/`, {},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {

                res.data.trainings.map((training) => {

                    axiosInstance
                        .post(`/training/group/get`, { id: training.training_group},{
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                            }
                        })
                        .then((res) => {

                            res.data.trainings.map((training) => {

                                    axiosInstance
                                        .post(`/training/get`, { id: training},{
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                                            }
                                        })
                                        .then((res) => {

                                            console.log(res.data)
                                            setUserTrainings( userTrainings => [...userTrainings , res.data])

                                        });

                            })

                        });

                })

            });

    }, []);

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    var today = new Date();
    var today_plus1 = today.addDays(1)
    var today_plus2 = today.addDays(2)
    var today_plus3 = today.addDays(3)
    var today_plus4 = today.addDays(4)
    var today_plus5 = today.addDays(5)
    var today_plus6 = today.addDays(6)

    return (
        <div className="dashboardTimetable">

            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Plan treningów</h1>
                <hr></hr>
            </div>

            <div className='container mt-4 mb-4'>

                <Table bordered>
                    <tbody>
                    <tr style={{backgroundColor:'#f2f2f2'}}>
                        <th>{today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()}</th>
                        <tr className='row m-0'>
                        {userTrainings.sort(function(a, b) {
                            var c = new Date(a.date_start);
                            var d = new Date(b.date_start);
                            return c-d;
                        }).map((training)=>{
                            if((today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()).match(training.date_start.substring(0, 10)))
                            return (
                                <td className='col-xl-3'>
                                <div className=' col-md-12 text-center border p-2 shadow' style={{backgroundColor:'white'}}>
                                    <div>{training.title}</div>
                                    <div>Od : {training.date_start.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                    <div>Do : {training.date_end.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                </div>
                                </td>
                            )
                        })}
                    </tr>
                    </tr>
                    <tr>
                        <th>{today_plus1.getFullYear()+'-'+(today_plus1.getMonth()+1)+'-'+today_plus1.getDate()}</th>
                        <tr className='row m-0'>
                        {userTrainings.sort(function(a, b) {
                            var c = new Date(a.date_start);
                            var d = new Date(b.date_start);
                            return c-d;
                        }).map((training)=>{
                            if((today_plus1.getFullYear()+'-'+(today_plus1.getMonth()+1)+'-'+today_plus1.getDate()).match(training.date_start.substring(0, 10)))
                                return (
                                    <td className='col-xl-3'>
                                        <div className=' col-md-12 text-center border p-2 shadow' style={{backgroundColor:'white'}}>
                                            <div>{training.title}</div>
                                            <div>Od : {training.date_start.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                            <div>Do : {training.date_end.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                        </div>
                                    </td>
                                )
                        })}
                    </tr>
                    </tr>
                    <tr style={{backgroundColor:'#f2f2f2'}}>
                        <th>{today_plus2.getFullYear()+'-'+(today_plus2.getMonth()+1)+'-'+today_plus2.getDate()}</th>
                        <tr className='row m-0'>
                        {userTrainings.sort(function(a, b) {
                            var c = new Date(a.date_start);
                            var d = new Date(b.date_start);
                            return c-d;
                        }).map((training)=>{
                            if((today_plus2.getFullYear()+'-'+(today_plus2.getMonth()+1)+'-'+today_plus2.getDate()).match(training.date_start.substring(0, 10)))
                                return (
                                    <td className='col-xl-3'>
                                        <div className=' col-md-12 text-center border p-2 shadow' style={{backgroundColor:'white'}}>
                                            <div>{training.title}</div>
                                            <div>Od : {training.date_start.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                            <div>Do : {training.date_end.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                        </div>
                                    </td>
                                )
                        })}
                    </tr>
                    </tr>
                    <tr>
                        <th>{today_plus3.getFullYear()+'-'+(today_plus3.getMonth()+1)+'-'+today_plus3.getDate()}</th>
                        <tr className='row m-0'>
                        {userTrainings.sort(function(a, b) {
                            var c = new Date(a.date_start);
                            var d = new Date(b.date_start);
                            return c-d;
                        }).map((training)=>{
                            if((today_plus3.getFullYear()+'-'+(today_plus3.getMonth()+1)+'-'+today_plus3.getDate()).match(training.date_start.substring(0, 10)))
                                return (
                                    <td className='col-xl-3'>
                                        <div className=' col-md-12 text-center border p-2 shadow' style={{backgroundColor:'white'}}>
                                            <div>{training.title}</div>
                                            <div>Od : {training.date_start.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                            <div>Do : {training.date_end.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                        </div>
                                    </td>
                                )
                        })}
                    </tr>
                    </tr>
                    <tr style={{backgroundColor:'#f2f2f2'}}>
                        <th>{today_plus4.getFullYear()+'-'+(today_plus4.getMonth()+1)+'-'+today_plus4.getDate()}</th>
                        <tr className='row m-0'>
                        {userTrainings.sort(function(a, b) {
                            var c = new Date(a.date_start);
                            var d = new Date(b.date_start);
                            return c-d;
                        }).map((training)=>{
                            if((today_plus4.getFullYear()+'-'+(today_plus4.getMonth()+1)+'-'+today_plus4.getDate()).match(training.date_start.substring(0, 10)))
                                return (
                                    <td className='col-xl-3'>
                                        <div className=' col-md-12 text-center border p-2 shadow' style={{backgroundColor:'white'}}>
                                            <div>{training.title}</div>
                                            <div>Od : {training.date_start.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                            <div>Do : {training.date_end.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                        </div>
                                    </td>
                                )
                        })}
                    </tr>
                    </tr>
                    <tr>
                        <th>{today_plus5.getFullYear()+'-'+(today_plus5.getMonth()+1)+'-'+today_plus5.getDate()}</th>
                        <tr className='row m-0'>
                        {userTrainings.sort(function(a, b) {
                            var c = new Date(a.date_start);
                            var d = new Date(b.date_start);
                            return c-d;
                        }).map((training)=>{
                            if((today_plus5.getFullYear()+'-'+(today_plus5.getMonth()+1)+'-'+today_plus5.getDate()).match(training.date_start.substring(0, 10)))
                                return (
                                    <td className='col-xl-3'>
                                        <div className=' col-md-12 text-center border p-2 shadow' style={{backgroundColor:'white'}}>
                                            <div>{training.title}</div>
                                            <div>Od : {training.date_start.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                            <div>Do : {training.date_end.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                        </div>
                                    </td>
                                )
                        })}
                    </tr>
                    </tr>
                    <tr style={{backgroundColor:'#f2f2f2'}}>
                        <th>{today_plus6.getFullYear()+'-'+(today_plus6.getMonth()+1)+'-'+today_plus6.getDate()}</th>
                        <tr className='row m-0'>
                        {userTrainings.sort(function(a, b) {
                            var c = new Date(a.date_start);
                            var d = new Date(b.date_start);
                            return c-d;
                        }).map((training)=>{
                            if((today_plus6.getFullYear()+'-'+(today_plus6.getMonth()+1)+'-'+today_plus6.getDate()).match(training.date_start.substring(0, 10)))
                                return (
                                    <td className='col-xl-3'>
                                        <div className=' col-md-12 text-center border p-2 shadow' style={{backgroundColor:'white'}}>
                                            <div>{training.title}</div>
                                            <div>Od : {training.date_start.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                            <div>Do : {training.date_end.replace('T',' ').replace('Z','').substring(11, 19)}</div>
                                        </div>
                                    </td>
                                )
                        })}
                    </tr>
                    </tr>
                    </tbody>
                </Table>

            </div>
        </div>
    );
}

export default Dashboard_timetable;