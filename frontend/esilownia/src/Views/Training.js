import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation} from "react-router-dom";

function Training() {

    const [groupId, setGroupId] = useState("")

    const location = useLocation()

    useEffect(() => {

        setGroupId(location.state.groupId)

    }, []);

    return (
        <div className="treningi">
            <div className="container">

                ID grupy : {groupId}
                Strona user training

            </div>
        </div>
    );
}

export default Training;