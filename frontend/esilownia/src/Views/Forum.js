import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ForumTopicsList from "../components/Forum/Forum_Topics_list";

function Forum() {
    return (
        <div className="forum">
            <div className="container">

                <ForumTopicsList></ForumTopicsList>

            </div>
        </div>
    );
}

export default Forum;