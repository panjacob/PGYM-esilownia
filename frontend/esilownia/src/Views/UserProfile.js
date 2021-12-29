import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import User_photo from "../components/UserProfile/User_photo";
import User_data from "../components/UserProfile/User_data";

function UserProfile() {

    return (
        <div className="UserProfile">
            <div className="container">

                <User_photo></User_photo>
                <User_data></User_data>

            </div>
        </div>
    );
}

export default UserProfile;