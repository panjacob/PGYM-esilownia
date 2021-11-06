import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DaneUserDay from "../components/Dashboard/Dashboard_data_userday";
import DaneUser from "../components/Dashboard/Dashboard_data_user";
import DashboardApplication from "../components/Dashboard/Dashboard_application";

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="container">

                <DaneUser></DaneUser>
                <DaneUserDay></DaneUserDay>
                <DashboardApplication></DashboardApplication>

            </div>
        </div>
    );
}

export default Dashboard;