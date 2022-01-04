import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Photo from "../../../imgs/gymcoin.png";
import axiosInstance from "../../Axios/Axios";
import ReactPaginate from 'react-paginate'
import {Link} from "react-router-dom";
import axios_variebles from "../../Axios/Axios_variebles";

function Diet_showAll() {

    const [dietAll, setDietAll] = useState([]);
    const [dietTypeAll, setDietTypeAll] = useState([]);
    const [typeSelected, setTypeSelected] = useState([]);
    const [dietFilter, setDietFilter] = useState([]);
    const [dieticianInfo, setDieticianInfo] = useState([]);
    const [selectedDietsType, setSelectedDietsType] = useState([]);
    const [userInfo,setUserInfo] = useState([])

    function uniqBy(a, key) {
        var seen = {};
        return a.filter(function (item) {
            var k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        })
    }


    const groupType = [
        {
            id: 1,
            is_private: true,
            name: 'personal',
            type: 'Personalny'
        }, {
            id: 2,
            is_private: false,
            name: 'group',
            type: 'Grupowy'
        }
    ]

    const handleChange = (e) => {
        let cleanArray = []
        if (typeSelected.length === 0) {

            cleanArray = dietAll;
        } else {

            dietAll.map(function (training) {

                for (let j = 0; j < training.type.length; j++) {

                    for (let i = 0; i < typeSelected.length; i++) {

                        if (training.type[j].toString() === typeSelected[i]) {

                            cleanArray.push(training)

                        }
                    }
                }
            })
        }


        let cleanArray3 = []
        let is_p = ''
        if (selectedDietsType.length === 0) {

            cleanArray3 = dietAll;
        } else {

            dietAll.map(function (training) {

                for (let i = 0; i < selectedDietsType.length; i++) {

                    if (selectedDietsType[i] === 'personal') {
                        is_p = 'true'
                    }
                    if (selectedDietsType[i] === 'group') {
                        is_p = 'false'
                    }
                    if (training.is_private.toString() === is_p) {

                        cleanArray3.push(training)

                    }
                }

            })
        }

        let result2 = uniqBy(cleanArray, JSON.stringify).filter(o1 => uniqBy(cleanArray3, JSON.stringify).some(o2 => o1.id === o2.id));

        setDietFilter(uniqBy(result2, JSON.stringify));

    }

    const typesChecked = (e) => {

        if (typeSelected.indexOf(e.target.name) !== -1) {
            let name = e.target.name;
            setTypeSelected(typeSelected.filter((e) => (e !== name)))
        } else {
            let name = e.target.name;
            setTypeSelected([...typeSelected, name]);
        }

    }


    const groupTypeChecked = (e) => {

        if (selectedDietsType.indexOf(e.target.name) !== -1) {
            let name = e.target.name;
            setSelectedDietsType(selectedDietsType.filter((e) => (e !== name)))
        } else {
            let name = e.target.name;
            setSelectedDietsType([...selectedDietsType, name]);
        }
    }


    useEffect(() => {

        axiosInstance
            .post(`diet/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setDietAll([])
                setDietFilter([])

                res.data.map((group) => {

                    axiosInstance
                        .post(`/diet/get`, {id: group.id}, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                            }
                        })
                        .then((res3) => {
                            if (res3.data.participants.length === 0 && res3.data.is_private === true) {
                                setDietFilter(trainingFilter => [...trainingFilter, group])
                            }
                            if (res3.data.is_private === false) {
                                setDietFilter(trainingFilter => [...trainingFilter, group])
                            }

                            if (res3.data.participants.length === 0 && res3.data.is_private === true) {
                                setDietAll(dietAll => [...dietAll, group])
                            }
                            if (res3.data.is_private === false) {
                                setDietAll(dietAll => [...dietAll, group])
                            }
                        });

                    axiosInstance
                        .post(`/users/get/`, {id: group.owner}, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                            }
                        })
                        .then((res2) => {
                            setDieticianInfo(trainersInfo => [...trainersInfo, res2.data])
                        });
                })
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
            .post(`/users/info/`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setUserInfo([])
                res.data.diets.map((userDietsId)=>{
                    setUserInfo(userInfo => [...userInfo, userDietsId.diet])
                })
            });

    }, []);

    function Items({currentItems}) {
        return (
            <div id="offer_container" className="row justify-content-center">
                {currentItems && currentItems.map(function (cValue, idx) {
                    if (!userInfo.includes(cValue.id)) {


                        return (
                            <div key={idx} style={{minWidth: '250px'}} className="col-md-4 mb-3 mt-2 flex">
                                <div className="h-100 card m-1 shadow bg-light" key={idx}>
                                    {(cValue.image === null) ? (
                                        <img src={Photo} width="233px" height="233px"
                                             className="card-img-top rounded-circle"
                                             alt="..."/>
                                    ) : (
                                        <img src={axios_variebles.baseURL.slice(0, -1) + cValue.image} width="233px"
                                             height="233px"
                                             className="card-img-top rounded-circle"
                                             alt="..."/>
                                    )}
                                    <div className="card-body">
                                        <div>
                                            <h5 className="card-title">{cValue.title}</h5>
                                            <div className="card-subtitle"
                                                 style={{overflow: 'auto', height: '100px'}}>
                                                {dietTypeAll.map(function (type, id) {
                                                    for (let i = 0; i < cValue.type.length; i++) {
                                                        if (cValue.type.includes(type.id)) {
                                                            return (<p style={{fontSize: '15px'}} className="m-0"
                                                                       key={id}>{type.type}</p>)
                                                        }
                                                    }
                                                })}
                                            </div>
                                            <p className="card-text"> Dietetyk: </p>
                                            {uniqBy(dieticianInfo, JSON.stringify).map((dietician, idx) => {
                                                if (dietician.id === cValue.owner)
                                                    return (<p key={idx}
                                                               className="card-text"> {dietician.first_name} {dietician.last_name} </p>)

                                            })}
                                            {(cValue.is_private === true) ? (
                                                <p className="card-text">Dieta prywatna</p>
                                            ) : (
                                                <p className="card-text">Dieta grupowa</p>
                                            )}
                                            <Link className='btn'
                                                  to={{
                                                      pathname: '/dieta_szczegóły',
                                                      search: 'id=' + cValue.id.toString()
                                                  }}
                                            >Pokaż Wiecej</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
                <div style={{minWidth: '250px'}} className="col-md-4"></div>
                <div style={{minWidth: '250px'}} className="col-md-4"></div>
            </div>
        );
    }

    function PaginatedItems({itemsPerPage}) {

        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(dietFilter.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(dietFilter.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        const handlePageClick = (event) => {
            const newOffset = event.selected * itemsPerPage % dietFilter.length;
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems}/>
                <div className='row justify-content-center text-center'
                     style={{position: 'absolute', bottom: '0', width: '100%'}}>
                    <ReactPaginate
                        nextLabel="Następna"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="Poprzednia"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </>
        );
    }


    return (
        <div className="dietShowAll">

            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Dostępne Diety</h1>
                <hr></hr>
            </div>


            <div className="row">

                <div className="col-md-3 border text-center pt-3 pb-3">
                    <h5 className="font-weight-light mt-1">Typ Diety:</h5>

                    <Form>
                        <hr width={'90%'} color={'black'}/>
                        <ul className="list-inline" style={{display: 'table', margin: '0 auto'}}>
                            {dietTypeAll.map((types) => (
                                <li className="m-1" key={`inline-checkbox-${types.id}`}>
                                    <div className="row">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input switch_1 align-text-bottom"
                                                type="checkbox"
                                                onChange={typesChecked.bind(this)}
                                                name={types.id}
                                                id={`inline-checkbox-${types.id}`}
                                            />
                                            <label className="form-check-label ml-4 align-text-bottom"
                                                   htmlFor="defaultCheck1">
                                                <b>{types.type.charAt(0).toUpperCase() + types.type.slice(1)}</b>
                                            </label>
                                        </div>
                                    </div>
                                    <hr color={'black'} className="m-1"/>
                                </li>
                            ))}
                        </ul>
                        <hr width={'90%'} color={'black'}/>
                    </Form>
                    <h5 className="font-weight-light mt-1">Rodzaje Diety:</h5>

                    <Form>
                        <hr width={'90%'} color={'black'}/>
                        <ul className="list-inline" style={{display: 'table', margin: '0 auto'}}>
                            {groupType.map((type) => (
                                <li className="m-1" key={`inline-checkbox-${type.id}`}>
                                    <div className="row">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input switch_1 align-text-bottom"
                                                type="checkbox"
                                                onChange={groupTypeChecked.bind(this)}
                                                name={type.name}
                                                id={`inline-checkbox-${type.id}`}
                                            />
                                            <label className="form-check-label ml-4 align-text-bottom"
                                                   htmlFor="defaultCheck1">
                                                <b>{type.type}</b>
                                            </label>
                                        </div>
                                    </div>
                                    <hr color={'black'} className="m-1"/>
                                </li>
                            ))}
                        </ul>
                        <hr width={'90%'} color={'black'}/>
                        <div className="col">
                            <Button className="btn btn-lg border-0 " style={{'color': 'black'}}
                                    onClick={handleChange}>Filtruj</Button>
                        </div>
                    </Form>

                </div>

                <div className="col-md-9 border text-center inline-block" style={{minHeight: '1400px'}}>

                    <PaginatedItems itemsPerPage={6}/>

                </div>
            </div>

        </div>
    );
}

export default Diet_showAll;