import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import User_photo from "../components/UserProfile/User_photo";

function UserProfile() {

    return (
        <div className="UserProfile">
            <div className="container">

                <User_photo></User_photo>


            </div>
        </div>
    );
}

export default UserProfile;