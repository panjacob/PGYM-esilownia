import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DaneUserDay from "../components/Dashboard/Dane_UserDay";

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="container">

                <DaneUserDay></DaneUserDay>

            </div>
        </div>
    );
}

export default Dashboard;