import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Photo from "../../../imgs/gymcoin.png";
import axiosInstance from "../../Axios/Axios";
import {Link} from "react-router-dom";
import axios_variebles from "../../Axios/Axios_variebles";

function Diet_showUserDiet() {

    const [dietsAll, setDietsAll] = useState([]);
    const [dietTypeAll, setDietTypeAll] = useState([]);
    const [userDiets, setUserDiets] = useState([]);

    useEffect(() => {

        axiosInstance
            .post(`diet/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setDietsAll(res.data)
            });

        axiosInstance
            .post(`diet/type/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setDietTypeAll(res.data)
            });

        axiosInstance
            .post(`users/info/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUserDiets(res.data.diets)
            });

    }, []);


    return (
        <div className="dietShowUserDiets">
            <div className="container">

                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Twoje Diety
                    </h1>
                    <hr></hr>
                </div>
                <div className="row border justify-content-center text-center inline-block">
                    {dietsAll.map((diet, idx) => {
                        for(let i = 0 ; i < userDiets.length; i++) {
                            if (userDiets[i].diet === diet.id) {
                                return (
                                    <div key={idx} style={{minWidth: '250px'}} className="col-md-3 mb-3 mt-2 flex ">
                                        <div className="h-100 card m-1 shadow bg-light">
                                            {(diet.image === null) ? (
                                                <img src={Photo} width="100%" height="width"
                                                     className="card-img-top rounded-circle"
                                                     alt="..."/>
                                            ):(
                                                <img src={axios_variebles.baseURL.slice(0, -1) + diet.image} width="233px" height="233px"
                                                     className="card-img-top rounded-circle"
                                                     alt="..."/>
                                            )}
                                            <div className="card-body">
                                                <div>
                                                    <h5 className="card-title">{diet.title}</h5>
                                                    <div className="card-subtitle"
                                                         style={{overflow: 'auto', height: '100px'}}>
                                                        {dietTypeAll.map(function (type, id) {
                                                            for (let i = 0; i < diet.type.length; i++) {
                                                                if (diet.type.includes(type.id)) {
                                                                    return (<p className="m-0"
                                                                               style={{fontSize:'15px'}}
                                                                               key={id}>{type.type}</p>)
                                                                }
                                                            }
                                                        })}
                                                    </div>
                                                    <p className="card-text text-center"> Dietetyk {diet.owner}</p>
                                                    <Link className='btn' to={{
                                                        pathname: '/grupa_diety',
                                                        search: 'id='+diet.id.toString()
                                                    }}>Szczegóły Diety {diet.id}</Link>

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
                    <div style={{minWidth: '250px'}} className="col-md-3"></div>
                </div>
            </div>

        </div>
    );
}

export default Diet_showUserDiet;