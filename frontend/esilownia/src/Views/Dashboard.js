import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DaneUserDay from "../components/Dashboard/Dashboard_data_userday";
import DaneUser from "../components/Dashboard/Dashboard_data_user";
import DashboardApplication from "../components/Dashboard/Dashboard_application";
import OfertaTrener from "../components/Dashboard/Dashboard_offer_trainer";
import {Button} from "react-bootstrap";

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="container">

                <DaneUser></DaneUser>
                <hr/>
                <div className="row justify-content-center text-center">
                    <div className="col-md-2 my-auto p-1">
                        <Button className="btn btn-lg border-0 " href='/treningi' style={{'color': 'black', 'width':'10rem'}}>Treningi</Button>
                    </div>
                    <div className="col-md-2  my-auto p-1">
                        <Button className="btn btn-lg border-0 " href='/dieta' style={{'color': 'black', 'width':'10rem'}}>Dieta</Button>
                    </div>
                </div>
                <DaneUserDay></DaneUserDay>
                <div className="container text-center">
                <h1 style={{"fontSize": "5vw"}} className="display-1 pb-4 pt-4">Jesteś trenerem?</h1>
                <h4 style={{"fontSize": "2vw"}} className="font-weight-light pb-4">Dołącz do naszego zespołu!</h4>
                </div>
                <OfertaTrener></OfertaTrener>
                <DashboardApplication></DashboardApplication>

            </div>
        </div>
    );
}

export default Dashboard;