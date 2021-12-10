import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DietUser from "../components/Diet/User/DietUser";
import DietDietician from "../components/Diet/Dietetician/DietDietician";

function Diet() {

    let isTrainer = false;
    if (localStorage.getItem('role') !== null) {
        isTrainer = JSON.parse(localStorage.getItem('role')).includes('dietician')
    }

    return (
        <div className="treningi">
            <div className="container font-weight-light mt-4">

                {/*strefa user*/}
                <DietUser></DietUser>

                {/*strefa trainer*/}
                {(isTrainer === true) ? (
                    <DietDietician></DietDietician>
                ) : ("")
                }

            </div>
        </div>
    );
}

export default Diet;