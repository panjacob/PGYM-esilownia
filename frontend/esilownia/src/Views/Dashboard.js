import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DaneUserDay from "../components/Dashboard/Dane_UserDay";
import DaneUser from "../components/Dashboard/Dane_User";

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