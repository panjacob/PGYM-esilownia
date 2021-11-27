import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Photo from "../../../imgs/gymcoin.png";
import axiosInstance from "../../Axios/Axios";
import ReactPaginate from 'react-paginate'
import {Link} from "react-router-dom";
import axios_variebles from "../../Axios/Axios_variebles";

function TrainingGroupShowAllGroup() {

    const [trainingGroupAll, setTrainingGroupAll] = useState([]);
    const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState([]);
    const [typeSelected, setTypeSelected] = useState([]);
    const [difficultySelected, setDifficultySelected] = useState([]);
    const [trainingFilter, setTrainingFilter] = useState([]);
    const [trainersInfo, setTrainersInfo] = useState([]);
    const [selectedGroupsType, setSelectedGroupsType] = useState([]);

    function uniqBy(a, key) {
        var seen = {};
        return a.filter(function (item) {
            var k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        })
    }

    const difficultiesAll = [
        {
            id: '0',
            name: 'Łatwy'
        }, {
            id: '1',
            name: 'Średni'
        }, {
            id: '2',
            name: 'Trudny'
        }, {
            id: '3',
            name: 'Armagedon'
        }
    ]

    const groupType = [
        {
            id: 1,
            is_private: true,
            name: 'personal',
            type: 'Personalny'
        },{
            id: 2,
            is_private: false,
            name: 'group',
            type: 'Grupowy'
        }
    ]

    const handleChange = (e) => {
        let cleanArray = []
        if (typeSelected.length === 0) {

            cleanArray = trainingGroupAll;
        } else {

            trainingGroupAll.map(function (training) {

                for (let j = 0; j < training.type.length; j++) {

                    for (let i = 0; i < typeSelected.length; i++) {

                        if (training.type[j].toString() === typeSelected[i]) {

                            cleanArray.push(training)

                        }
                    }
                }
            })
        }

        let cleanArray2 = []
        if (difficultySelected.length === 0) {

            cleanArray2 = trainingGroupAll;
        } else {

            trainingGroupAll.map(function (training) {

                for (let i = 0; i < difficultySelected.length; i++) {

                    if (training.difficulty.toString() === difficultySelected[i]) {

                        cleanArray2.push(training)

                    }
                }

            })
        }

        let cleanArray3 = []
        let is_p = ''
        if (selectedGroupsType.length === 0) {

            cleanArray3 = trainingGroupAll;
        } else {

            trainingGroupAll.map(function (training) {

                for (let i = 0; i < selectedGroupsType.length; i++) {

                    if(selectedGroupsType[i] === 'personal'){
                        is_p = 'true'
                    }
                    if(selectedGroupsType[i] === 'group'){
                        is_p = 'false'
                    }
                    if (training.is_private.toString() === is_p) {

                        cleanArray3.push(training)

                    }
                }

            })
        }

        let result = uniqBy(cleanArray, JSON.stringify).filter(o1 => uniqBy(cleanArray2, JSON.stringify).some(o2 => o1.id === o2.id));
        let result2 = uniqBy(result, JSON.stringify).filter(o1 => uniqBy(cleanArray3, JSON.stringify).some(o2 => o1.id === o2.id));

        setTrainingFilter(uniqBy(result2, JSON.stringify));

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

    const difficultiesChecked = (e) => {

        if (difficultySelected.indexOf(e.target.name) !== -1) {
            let name = e.target.name;
            setDifficultySelected(difficultySelected.filter((e) => (e !== name)))
        } else {
            let name = e.target.name;
            setDifficultySelected([...difficultySelected, name]);
        }

    }

    const groupTypeChecked = (e) => {

        if (selectedGroupsType.indexOf(e.target.name) !== -1) {
            let name = e.target.name;
            setSelectedGroupsType(selectedGroupsType.filter((e) => (e !== name)))
        } else {
            let name = e.target.name;
            setSelectedGroupsType([...selectedGroupsType, name]);
        }
    }



    useEffect(() => {

        axiosInstance
            .post(`training/group/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTrainingGroupAll([])
                setTrainingFilter([])

                res.data.map((group) => {

                    axiosInstance
                        .post(`/training/group/get`, {id: group.id}, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                            }
                        })
                        .then((res3) => {
                            if (res3.data.participants.length === 0 && res3.data.is_private === true ) {
                                setTrainingFilter(trainingFilter => [...trainingFilter, group])
                            }
                            if(res3.data.is_private === false){
                                setTrainingFilter(trainingFilter => [...trainingFilter, group])
                            }

                            if (res3.data.participants.length === 0 && res3.data.is_private === true ) {
                                setTrainingGroupAll(trainingGroupAll => [...trainingGroupAll, group])
                            }
                            if(res3.data.is_private === false){
                                setTrainingGroupAll(trainingGroupAll => [...trainingGroupAll, group])
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
                            setTrainersInfo(trainersInfo => [...trainersInfo, res2.data])
                        });
                })
            });

        axiosInstance
            .post(`training/group/type/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTrainingGroupTypeAll(res.data)
            });

    }, []);


    function Items({currentItems}) {
        return (
            <div id="offer_container" className="row justify-content-center">
                {currentItems && currentItems.map(function (cValue, idx) {

                        return (
                            <div key={idx} style={{minWidth: '250px'}} className="col-md-4 mb-3 mt-2 flex">
                                <div className="h-100 card m-1 shadow bg-light" key={idx}>
                                    {(cValue.image === null) ? (
                                        <img src={Photo} width="100%" height="width"
                                             className="card-img-top rounded-circle"
                                             alt="..."/>
                                    ) : (
                                        <img src={axios_variebles.baseURL.slice(0, -1) + cValue.image} width="100%"
                                             height="width"
                                             className="card-img-top rounded-circle"
                                             alt="..."/>
                                    )}
                                    <div className="card-body">
                                        <div>
                                            <h5 className="card-title">{cValue.title}</h5>
                                            <div className="card-subtitle"
                                                 style={{overflow: 'auto', height: '100px'}}>
                                                {trainingGroupTypeAll.map(function (type, id) {
                                                    for (let i = 0; i < cValue.type.length; i++) {
                                                        if (cValue.type.includes(type.id)) {
                                                            return (<p style={{fontSize: '15px'}} className="m-0"
                                                                       key={id}>{type.type}</p>)
                                                        }
                                                    }
                                                })}
                                            </div>
                                            <p className="card-text"> Trener: </p>
                                            {uniqBy(trainersInfo, JSON.stringify).map((trainer, idx) => {
                                                if (trainer.id === cValue.owner)
                                                    return (<p key={idx}
                                                               className="card-text"> {trainer.first_name} {trainer.last_name} </p>)

                                            })}
                                            {difficultiesAll.map((difficulty) => {
                                                if (difficulty.id === cValue.difficulty) {
                                                    return (<p className="card-text"> Poziom: {difficulty.name}</p>)
                                                }
                                            })}
                                            {(cValue.is_private === true) ? (
                                                <p className="card-text">Trening Personalny</p>
                                            ) : (
                                                <p className="card-text">Trening Grupowy</p>
                                            )}
                                            <Link className='btn' to={{
                                                pathname: '/grupa_szczegóły',
                                                state: {
                                                    groupId: cValue.id
                                                }
                                            }}>Pokaż Wiecej</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

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
            setCurrentItems(trainingFilter.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(trainingFilter.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        const handlePageClick = (event) => {
            const newOffset = event.selected * itemsPerPage % trainingFilter.length;
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems}/>
                <div className='row justify-content-center text-center' style={{position:'absolute',bottom:'0',width:'100%'}}>
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
        <div className="trainingGroupShowAll">

            <div className="text-center">
                <hr></hr>
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Dostępne Treningi</h1>
                <hr></hr>
            </div>


            <div className="row" >

                <div className="col-md-3 border text-center pt-3 pb-3">
                    <h5 className="font-weight-light mt-1">Typ Treningu:</h5>

                    <Form>
                        <hr width={'90%'} color={'black'}/>
                        <ul className="list-inline" style={{display: 'table', margin: '0 auto'}}>
                            {trainingGroupTypeAll.map((types) => (
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

                    <h5 className="font-weight-light mt-1">Poziomy Treningu:</h5>

                    <Form>
                        <hr width={'90%'} color={'black'}/>
                        <ul className="list-inline" style={{display: 'table', margin: '0 auto'}}>
                            {difficultiesAll.map((difficulties) => (
                                <li className="m-1" key={`inline-checkbox-${difficulties.id}`}>
                                    <div className="row">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input switch_1 align-text-bottom"
                                                type="checkbox"
                                                onChange={difficultiesChecked.bind(this)}
                                                name={difficulties.id}
                                                id={`inline-checkbox-${difficulties.id}`}
                                            />
                                            <label className="form-check-label ml-4 align-text-bottom"
                                                   htmlFor="defaultCheck1">
                                                <b>{difficulties.name}</b>
                                            </label>
                                        </div>
                                    </div>
                                    <hr color={'black'} className="m-1"/>
                                </li>
                            ))}
                        </ul>
                        <hr width={'90%'} color={'black'}/>
                    </Form>

                    <h5 className="font-weight-light mt-1">Rodzaje treningu:</h5>

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
                            <Button className="btn btn-lg border-0 " style={{'color': 'black'}} onClick={handleChange}>Filtruj</Button>
                        </div>
                    </Form>

                </div>

                <div className="col-md-9 border text-center inline-block" style={{minHeight:'1400px'}}>

                    <PaginatedItems itemsPerPage={6}/>

                </div>
            </div>

        </div>
    );
}

export default TrainingGroupShowAllGroup;