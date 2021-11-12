import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainingGet from "../components/Training/Get_DoUsuniecia/TrainingGet";
import TrainingJoin from "../components/Training/Get_DoUsuniecia/TrainingJoin";
import TrainingLeave from "../components/Training/Get_DoUsuniecia/TrainingLeave";
import TrainingCreate from "../components/Training/Post_DoUsuniecia/TrainingCreate"
import TrainingRemove from "../components/Training/Post_DoUsuniecia/TrainingRemove";

function Training() {


    return (
        <div className="treningi">
            <div className="container">
                <TrainingGet></TrainingGet>
                <TrainingJoin></TrainingJoin>
                <TrainingLeave></TrainingLeave>
                <TrainingCreate></TrainingCreate>
                <TrainingRemove></TrainingRemove>

            </div>
        </div>
    );
}

export default Training;