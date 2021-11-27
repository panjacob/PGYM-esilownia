import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import background from '../../imgs/homeholder2.jpg'

function HomeWelcome() {

    return (
        <div className="homeWelcome">

            <div className="" style={{
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