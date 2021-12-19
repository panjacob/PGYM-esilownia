import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import DietShowDieticianDiets from "./DietShowDieticianDiets";
import DietCreate from "./DietCreate";
import DietEdit from "./DietEdit";

function DieticianSpace(){
    return(
        <div className="DieticianSpace">
            <DietShowDieticianDiets/>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <DietCreate/>
                    </div>
                    <div className='col-md-6'>
                        <DietEdit/>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className="row justify-content-center">
                    <div className="text-center">
                        <hr></hr>
                        <h1 style={{"fontSize": "5vw"}} className="display-1 font-weight-light mb-4">Strefa
                            Użytkownika</h1>
                        <hr></hr>
                    </div>
                </div>

                <div className="row p-5 justify-content-center">
                    <Button className="btn btn-lg border-0 " style={{'color': 'black'}} href='/dieta'>Przejdz do strefy Użytkownika</Button>
                </div>
            </div>

        </div>
    )
}export default DieticianSpace