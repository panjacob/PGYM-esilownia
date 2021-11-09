import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DaneUserDay from "../components/Dashboard/Dashboard_data_userday";
import DaneUser from "../components/Dashboard/Dashboard_data_user";
import DashboardApplication from "../components/Dashboard/Dashboard_application";
import OfertaTrener from "../components/Dashboard/Dashboard_offer_trainer";

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="container">

                <DaneUser></DaneUser>
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