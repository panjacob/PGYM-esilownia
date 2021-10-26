import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <div class="container">
                <div class="row align-items-center my-5">
                    <div class="col-lg-7">
                        <img
                            class="img-fluid rounded mb-4 mb-lg-0"
                            src="https://riotopgym.pl/wp-content/uploads/2020/06/IMG-3651.jpg"
                            alt=""
                        />
                    </div>
                    <div class="col-lg-5">
                        <h1 class="font-weight-light">Dashboard</h1>
                        <p>
                            Strona na dashboard
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;