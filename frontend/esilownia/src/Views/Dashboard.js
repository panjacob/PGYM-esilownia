import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DaneUserDay from "../components/Dashboard/Dashboard_data_userday";
import DaneUser from "../components/Dashboard/Dashboard_data_user";

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="container">

                <DaneUser></DaneUser>
                <DaneUserDay></DaneUserDay>

            </div>
        </div>
    );
}

export default Dashboard;