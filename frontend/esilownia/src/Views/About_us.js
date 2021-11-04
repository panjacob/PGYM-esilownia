import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CechyONas from "../components/About_us/About_us_traits";
import OpisONas from "../components/About_us/About_us_description";
import Kontakt from "../components/About_us/About_us_contact";

function About_us() {
    return (
        <div className="about_us b-5">

            <div className="container">
                <OpisONas></OpisONas>
            </div>

            <div className="container">
                <CechyONas></CechyONas>
            </div>

            <div className="container">
                <Kontakt></Kontakt>
            </div>

        </div>
    );
}

export default About_us;