import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import background from '../../imgs/homeholder2.jpg'

function HomeWelcome() {

    return (
        <div className="homeWelcome container-fluid">

            <div className="mt-3" style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                width: 'calc(100vw - (100vw - 100%))',
                height: '30vw'
            }}>
            </div>
            <hr/>

        </div>
    );
}

export default HomeWelcome;