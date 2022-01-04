import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../Axios/Axios";
import {
    LineChart,
    AreaChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Area
} from "recharts";

function Dashboard_chart(){
    const [dayData, setDayData] = useState([]);

    useEffect(() => {
        axiosInstance
            .post(`dashboard/user_day/get_all`,{}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res)=>{
                setDayData(res.data)
            })

    }, []);


    return(
        <div className="dashboardChart">
            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Wykresy Postępów</h1>
                <hr></hr>
            </div>
            <div className="row">
                <div className="col-md-6 text-center">
                    <h1 style={{"fontSize": "4vw"}} className="display-1 font-weight-light mb-4">Waga</h1>
                    <hr></hr>
                    <ResponsiveContainer height={300}>
                        <LineChart width={500} height={300} data={dayData}>
                            <Line type="monotone" dataKey="weight" stroke="#fc9803"/>
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="font-weight-light" style={{color:'orange'}}>Waga</p>
                </div>
                <div className="col-md-6 text-center">
                    <h1 style={{"fontSize": "4vw"}} className="display-1 font-weight-light mb-4">Kalorie</h1>
                    <hr></hr>
                    <ResponsiveContainer height={300}>
                        <AreaChart width={500} height={300} data={dayData}>
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                            <XAxis dataKey="date"/>
                            <YAxis/>
                            <Tooltip/>
                            <Area type="monotone" dataKey="calories_eaten" stroke='#fc9803' fill='#fc9803'/>
                            <Area type="monotone" dataKey="calories_burned" stroke='#fc0303' fill='#fc0303'/>
                        </AreaChart>
                    </ResponsiveContainer>
                    <p className="font-weight-light" style={{color:'red'}}>Spalone kalorie</p>
                    <p className="font-weight-light" style={{color:'orange'}}>Spożyte kalorie</p>
                </div>
            </div>
            <hr/>
        </div>
    )
}export default Dashboard_chart
