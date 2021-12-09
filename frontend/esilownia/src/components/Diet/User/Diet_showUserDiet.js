import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import Photo from "../../../imgs/gymcoin.png";
import axios_variebles from "../../Axios/Axios_variebles";
import {Link} from "react-router-dom";

function Diet_showUserDiet(){

    // const [diets, setDiets] = useState([]);
    // const [userDiets, setUserDiets] = useState([]);
    //
    // useEffect(() => {
    //
    //     axiosInstance
    //         .post(`diet/all`, {}, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
    //             }
    //         })
    //         .then((res) => {
    //             setDiets(res.data)
    //         });
    //
    //     axiosInstance
    //         .post(`users/info/`, {}, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
    //             }
    //         })
    //         .then((res) => {
    //             setUserDiets(res.data.trainings)
    //         });
    //
    // }, []);

    const userDiets = [
        {
            id: 1,
        },
    ]

    const diets = [
        {
            id: 1,
            title: 'Dieta Kox',
            type: 'smaczne',
            calories: 2500,
            dietician: 'Bob Dylan'

        },
        {
            id: 2,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
        {
            id: 3,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
        {
            id: 4,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
        {
            id: 5,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
        {
            id: 6,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
        {
            id: 7,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
        {
            id: 8,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
        {
            id: 9,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
    ]

    return(
        <div className="dietShowUserDiet">
            <div className="container">
                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">
                        Twoje Diety
                    </h1>
                    <hr></hr>
                </div>
                <div className="row">
                    <div className="col border rounded text-center inline-block" style={{minHeight:'800px'}}>
                        <div className="container">
                            <div className="row justify-content-center text-center inline-block">
                                {diets.map(function (cValue, idx){
                                    for(let i = 0 ; i < userDiets.length; i++) {
                                        if (userDiets[i].diets === diets.id) {
                                            return(
                                                <div key={idx} style={{minWidth: '250px'}} className="col-md-4 mb-3 mt-2 flex ">
                                                    <div className="h-100 card m-1 shadow bg-light">
                                                        <div className="card-body">
                                                            <div>
                                                                <h5 className="card-title">
                                                                    {cValue.title}
                                                                </h5>
                                                                <div className="card-subtitle" style={{overflow: 'auto', height: '100px'}}>
                                                                    <p style={{fontSize: '15px'}} className="m-0"
                                                                       key={idx}>{cValue.type}</p>
                                                                </div>
                                                                <div className="card-text">
                                                                    <p>Dietetyk: {cValue.dietician}</p>
                                                                    <p>Kalorie: {cValue.calories}</p>
                                                                    <Link className='btn' to={{
                                                                        pathname: '/',
                                                                        state: {
                                                                            Diet: cValue.id
                                                                        }
                                                                    }}>Przejdź do Diety</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                })}
                                <div style={{minWidth: '250px'}} className="col-md-3"></div>
                                <div style={{minWidth: '250px'}} className="col-md-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}export default Diet_showUserDiet