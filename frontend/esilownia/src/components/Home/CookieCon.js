import React from "react";
import CookieConsent, {Cookies} from "react-cookie-consent";
import 'bootstrap/dist/css/bootstrap.min.css';


function CookieCon() {
    return (
        <CookieConsent
            location="bottom"
            buttonText="Ok!"
            cookieName="CiastkoDlaKuby"
            style={{background: "#777"}}
            buttonStyle={{color: "black", fontSize: "13px", background: "orange"}}
            expires={150}
            enableDeclineButton
            onDecline={() => {
                alert("Nie!");
            }}
        >
            Ta strona używa ciasteczek! {" "}
            <span style={{fontSize: "10px"}}>Jeśli się zgadzasz kliknij ok</span>
        </CookieConsent>
    );
}

export default CookieCon;