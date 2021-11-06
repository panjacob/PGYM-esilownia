import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModeratorPanelApplications from "../components/Moderator_panel/Moderator_panel_applications";

function ModeratorPanel() {

    return (
        <div className="moderatorPanel">
            <div className="container">
                <ModeratorPanelApplications></ModeratorPanelApplications>
            </div>
        </div>
    );
}

export default ModeratorPanel;