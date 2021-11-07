import React, {useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModeratorPanelApplications from "../components/Moderator_panel/Moderator_panel_applications";
import axiosInstance from "../components/Axios/Axios";

function ModeratorPanel() {

    const [applications, setApplications] = useState([]);

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

    }, []);

    const onButtonClick = (e) => {
        document.getElementById(`application-${e.target.id}`).scrollIntoView()
    };

    const listApplications = applications.map((id) =>
        <li key={id.id}>
            <button className={'btn btn-outline-dark my-1'} id={id.id}
                    onClick={onButtonClick.bind(this)}>Podanie nr.{id.id}</button>
        </li>
    );

    return (
        <div className="moderatorPanel">
            <div className="container-fluid">
                <div className="row">

                    <div className="col-3 my-auto">
                        <div className="text-center">
                            <hr></hr>
                            <h1 style={{"fontSize": "3vw"}} className="display-1 font-weight-light mb-4">Spis podań</h1>
                            <h1 style={{"fontSize": "2vw"}} className="display-1 font-weight-light mb-4">Kliknij by przejść do podania</h1>
                            <hr></hr>
                        </div>
                        <ul className="border text-center list-unstyled" style={{overflowY: 'scroll', flex: '1', height: '500px'}}>
                            {listApplications}
                        </ul>
                    </div>

                    <div className="col-9 ">
                        <ModeratorPanelApplications></ModeratorPanelApplications>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModeratorPanel;