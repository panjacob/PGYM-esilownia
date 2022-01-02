import React, {useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModeratorPanelApplications from "../components/Moderator_panel/Moderator_panel_applications";
import axiosInstance from "../components/Axios/Axios";
import ModeratorPanelReport from "../components/Moderator_panel/Moderator_panel_reports";

function ModeratorPanel() {

    const [applications, setApplications] = useState([]);
    const [appStatus, setAppStatus] = useState(['0']);

    const [report, setReports] = useState([]);
    const [repStatus, setRepStatus] = useState(['false']);

    let r = repStatus;

    let s = appStatus;

    useEffect(() => {

        axiosInstance
            .post(`/moderator/application/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                console.log(res.data)
                setApplications(res.data)
            });

        axiosInstance
            .post(`/moderator/report/all`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
                }
            })
            .then((res) => {
                console.log(res.data)
                setReports(res.data)
            });

    }, []);

    const onButtonClick = (e) => {
        document.getElementById(`application-${e.target.id}`).scrollIntoView()
    };

    function checkStatus(app) {
        return appStatus.includes(app.status);
    }

    const listApplications = applications.filter(checkStatus).map((id) =>
        <li key={id.id}>
            <button className={'btn btn-outline-dark my-1'} id={id.id}
                    onClick={onButtonClick.bind(this)}>Podanie nr.{id.id}</button>
        </li>
    );

    const onButtonClickRep = (e) => {
        document.getElementById(`report-${e.target.id}`).scrollIntoView()
    };

    function checkStatusRep(rep) {
        return repStatus.includes(rep.is_solved.toString());
    }

    const listReports = report.filter(checkStatusRep).map((id) =>
        <li key={id.id}>
            <button className={'btn btn-outline-dark my-1'} id={id.id}
                    onClick={onButtonClickRep.bind(this)}>Zgłoszenie nr.{id.id}</button>
        </li>
    );

    const applicationStatus = (e) => {

        if(appStatus.indexOf(e.target.value) !== -1) {
            let name = e.target.value;
            setAppStatus(appStatus.filter((e)=>(e !== name)))
        } else {
            let name = e.target.value;
            setAppStatus([...appStatus,name]);
        }
        console.log(appStatus)
    }

    const reportStatus = (e) => {

        if(repStatus.indexOf(e.target.value) !== -1) {
            let name = e.target.value;
            setRepStatus(repStatus.filter((e)=>(e !== name)))
        } else {
            let name = e.target.value;
            setRepStatus([...repStatus,name]);
        }
        console.log(repStatus)
    }


    return (
        <div className="moderatorPanel">
            <div className="container-fluid">
                <div className="row pt-4 justify-content-center">

                    <div className="col-3 m-2 border shadow">
                        <div className="text-center">
                            <hr></hr>
                            <h1 style={{"fontSize": "3vw"}} className="display-1 font-weight-light mb-4">Spis podań</h1>
                            <h1 style={{"fontSize": "2vw"}} className="display-1 font-weight-light mb-4">Kliknij by przejść do podania</h1>
                            <div onChange={applicationStatus.bind(this)}>
                                <div className="mx-2">
                                    <input type="checkbox" value="0"
                                           name="application_role" defaultChecked/> Oczekujace
                                </div>
                                <div className="mx-2">
                                    <input type="checkbox" value="1"
                                           name="application_role"/> Zaakceptowane
                                </div>
                                <div className="mx-2">
                                    <input type="checkbox" value="2"
                                           name="application_role"/> Odrzucone
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                        <ul className="border text-center list-unstyled" style={{overflowY: 'scroll', flex: '1', height: '500px'}}>
                            {listApplications}
                        </ul>
                    </div>

                    <div className="col-8 m-2 border shadow">
                        <ModeratorPanelApplications appStatus={s}></ModeratorPanelApplications>
                    </div>
                </div>
            </div>


            <div className="container-fluid">
                <div className="row pt-4 justify-content-center">

                    <div className="col-3 m-2 border shadow">
                        <div className="text-center">
                            <hr></hr>
                            <h1 style={{"fontSize": "3vw"}} className="display-1 font-weight-light mb-4">Spis zgłoszeń</h1>
                            <h1 style={{"fontSize": "2vw"}} className="display-1 font-weight-light mb-4">Kliknij by przejść do zgłoszenia</h1>
                            <div onChange={reportStatus.bind(this)}>
                                <div className="mx-2">
                                    <input type="checkbox" value="false"
                                           name="application_role" defaultChecked/> Oczekujace
                                </div>
                                <div className="mx-2">
                                    <input type="checkbox" value="true"
                                           name="application_role"/> Rozwiazane
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                        <ul className="border text-center list-unstyled" style={{overflowY: 'scroll', flex: '1', height: '500px'}}>
                            {listReports}
                        </ul>
                    </div>

                    <div className="col-8 m-2 border shadow">
                        <ModeratorPanelReport repStatus={r}></ModeratorPanelReport>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModeratorPanel;