import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReportForm from "../components/Report/Report_form";

function Report() {

    return (
        <div className="report">
            <div className="container">

                <ReportForm></ReportForm>

            </div>
        </div>
    );
}

export default Report;