import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import background from '../../imgs/homeholder.jpg'

function HomeWelcome() {

    return (
        <div className="homeWelcome container-fluid">

            <div className="mt-3" style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                width: 'calc(100vw - (100vw - 100%))',
                height: '30vw'
            }}>

                {/*<div className='row h-100 d-flex span-1 offset-2 align-items-center'>*/}
                {/*    <div className="col-sm-7 text-white" style={{backgroundColor: 'rgba(255, 255, 255, .4)',borderRadius:'5px', width:'auto'}}>*/}
                {/*        <h1 style={{*/}
                {/*            "fontSize": "8vw",*/}
                {/*            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'*/}
                {/*        }} className="display-1">PGYM</h1>*/}
                {/*        <h1 style={{*/}
                {/*            "fontSize": "3vw",*/}
                {/*            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'*/}
                {/*        }} className="display-1 span-1 offset-6">Trenuj już dziś !</h1>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>

        </div>
    );
}

export default HomeWelcome;