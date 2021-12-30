import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import User_photo from "../components/UserProfile/User_photo";
import User_data from "../components/UserProfile/User_data";
import User_send_message from "../components/UserProfile/User_send_message";

function UserProfile() {

    return (
        <div className="UserProfile">
            <div className="container">

                <User_photo></User_photo>
                <User_data></User_data>
                <User_send_message></User_send_message>

            </div>
        </div>
    );
}

export default UserProfile;