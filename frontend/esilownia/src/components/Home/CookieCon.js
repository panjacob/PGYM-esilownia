import React from "react";
import CookieConsent, {Cookies} from "react-cookie-consent";
import 'bootstrap/dist/css/bootstrap.min.css';


function CookieCon() {
    return (
        <CookieConsent
            location="bottom"
            buttonText="Ok!"
            cookieName="CiastkeczkoPGYM"
            style={{background: "black"}}
            buttonStyle={{color: "black", fontSize: "13px", background: "orange"}}
            expires={150}
        >
            Ta strona używa ciasteczek! {" "}
            <span style={{fontSize: "12px"}}>Jeśli Ci to nie przeszkadza kliknij Ok!</span>
        </CookieConsent>
    );
}

export default CookieCon;