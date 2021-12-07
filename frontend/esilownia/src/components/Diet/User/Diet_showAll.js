import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from "../../Axios/Axios";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";

function Diet_showAll(){

    // const [diets, setDiets] = useState([]);
    //
    //
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
    // },[]);

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
            id: 2,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
        {
            id: 2,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
        {
            id: 2,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
        {
            id: 2,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
        {
            id: 2,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
        {
            id: 2,
            title: 'Slaba Dieta',
            type: 'niesmaczne',
            calories: 1800,
            dietician: 'Anna Dymna'

        },
    ]

    function Items ({currentItems}){
        return(
                <div className="row justify-content-center text-center inline-block">
                    {currentItems && currentItems.map(function (cValue, idx){
                        return(

                            <div key={idx} style={{minWidth: '250px'}} className="col-md-4 mb-3 mt-2 flex">
                                <div className="h-100 card m-1 shadow bg-light" key={idx}>
                                    <div className="card-body">
                                        <div className="card-title">
                                            <h5>{cValue.title}</h5>
                                        </div>
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
                                            }}>Wykup Dostęp</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div style={{minWidth: '250px'}} className="col-md-3"></div>
                    <div style={{minWidth: '250px'}} className="col-md-3"></div>
                    <div style={{minWidth: '250px'}} className="col-md-3"></div>
                </div>
        )
    }

    function PaginatedItems({ itemsPerPage }) {
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(diets.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(diets.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % diets.length;
            setItemOffset(newOffset);
        };
        return(
            <div className="container">
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
            </div>
        )
    }


    return(
        <div className="dietShowAll">
            <div className="container">
                <div className="text-center">
                    <hr></hr>
                    <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">
                        Dostępne Diety
                    </h1>
                    <hr></hr>
                </div>
                <div className="row">
                    <div className="col border text-center inline-block" style={{minHeight:'800px'}}>


                    <PaginatedItems itemsPerPage={6}></PaginatedItems>
                    </div>
                </div>
            </div>

        </div>
    )
}export default Diet_showAll