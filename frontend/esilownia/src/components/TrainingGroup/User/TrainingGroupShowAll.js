import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Photo from "../../../imgs/gymcoin.png";
import axiosInstance from "../../Axios/Axios";
import ReactPaginate from 'react-paginate'
import {Link} from "react-router-dom";

function TrainingGroupShowAll() {

    const [trainingGroupAll, setTrainingGroupAll] = useState([]);
    const [trainingGroupTypeAll, setTrainingGroupTypeAll] = useState([]);
    const [typeSelected, setTypeSelected] = useState([]);
    const [difficultySelected, setDifficultySelected] = useState([]);
    const [trainingFilter, setTrainingFilter] = useState([]);
    const [trainersInfo, setTrainersInfo] = useState([]);

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

        let result = uniqBy(cleanArray, JSON.stringify).filter(o1 => uniqBy(cleanArray2, JSON.stringify).some(o2 => o1.id === o2.id));

        setTrainingFilter(uniqBy(result, JSON.stringify));

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


    useEffect(() => {

        axiosInstance
            .post(`training/group/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                setTrainingGroupAll(res.data)
                setTrainingFilter(res.data)

                res.data.map((group) => {
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
                            <div className="h-100 card m-1 shadow" key={idx}>
                                <img src={Photo} width="100%" height="width"
                                     className="card-img-top rounded-circle"
                                     alt="..."/>
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
                                        {difficultiesAll.map((difficulty)=>{
                                            if(difficulty.id === cValue.difficulty) {
                                                return (<p className="card-text"> Poziom: {difficulty.name}</p>)
                                            }
                                        })}
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
                <div className='row justify-content-center'>
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
                <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Wszystkie grupy</h1>
                <hr></hr>
            </div>


            <div className="row">

                <div className="col-md-3 border text-center">
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
                        <div className="col">
                            <Button onClick={handleChange}>Filtruj</Button>
                        </div>
                    </Form>

                </div>

                <div className="col-md-9 border text-center inline-block">

                    <PaginatedItems itemsPerPage={6}/>

                </div>
            </div>

        </div>
    );
}

export default TrainingGroupShowAll;