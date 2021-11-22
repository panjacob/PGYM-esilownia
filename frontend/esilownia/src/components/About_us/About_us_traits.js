import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ImHome} from 'react-icons/im'
import {AiFillCar, AiFillCalendar} from "react-icons/ai";
import {GiMinions} from "react-icons/gi";
import {BsFillDisplayFill, BsFillPlayCircleFill} from "react-icons/bs";

function About_us_traits() {
    return (

        <div className="about_us_traits">

            <div className="row">
                <div className="col-md border rounded shadow m-1">

                    <div className="row justify-content-center" style={{padding: "10% 0% 0% 0%"}}>
                        <ImHome size={100}/>
                    </div>
                    <div className="row text-center mx-auto" style={{padding: "5% 15% 5% 15%"}}>
                        <p><b>
                            Trenujesz w wybranym przez siebie miejscu. Bezpiecznie i w znajomym środowisku bez
                            fizycznego kontaktu.
                        </b></p>
                    </div>

                </div>
                <div className="col-md border rounded shadow m-1">

                    <div className="row justify-content-center" style={{padding: "10% 0% 0% 0%"}}>
                        <AiFillCar size={100}/>
                    </div>
                    <div className="row text-center mx-auto" style={{padding: "5% 15% 5% 15%"}}>
                        <p><b>Nie tracisz czasu i pieniędzy na dojazdy i stanie w korkach.
                        </b></p>
                    </div>

                </div>
            </div>

            <div className="row">
                <div className="col-md border rounded shadow m-1">

                    <div className="row justify-content-center" style={{padding: "10% 0% 0% 0%"}}>
                        <AiFillCalendar size={100}/>
                    </div>
                    <div className="row text-center mx-auto" style={{padding: "5% 15% 5% 15%"}}>
                        <p><b>
                            Plan i czas treningów jest w zupełności zależny od ciebie. Wybierasz z kim lub kiedy chcesz
                            ćwiczyć.
                        </b></p>
                    </div>

                </div>
                <div className="col-md border rounded shadow m-1">

                    <div className="row justify-content-center" style={{padding: "10% 0% 0% 0%"}}>
                        <GiMinions size={100}/>
                    </div>
                    <div className="row text-center mx-auto" style={{padding: "5% 15% 5% 15%"}}>
                        <p><b>Treningi personalne lub grupowe wybierasz w jakim stylu chcesz ćwiczyć.</b></p>
                    </div>

                </div>
            </div>

            <div className="row">
                <div className="col-md border rounded shadow m-1">

                    <div className="row justify-content-center" style={{padding: "10% 0% 0% 0%"}}>
                        <BsFillDisplayFill size={100}/>
                    </div>
                    <div className="row text-center mx-auto" style={{padding: "5% 15% 5% 15%"}}>
                        <p><b>Na tej samej platformie znajdziesz siłownie , klub fitness lub porady dietetyczne.</b></p>
                    </div>

                </div>
                <div className="col-md border rounded shadow m-1">

                    <div className="row justify-content-center" style={{padding: "10% 0% 0% 0%"}}>
                        <BsFillPlayCircleFill size={100}/>
                    </div>
                    <div className="row text-center mx-auto" style={{padding: "5% 15% 5% 15%"}}>
                        <p><b>
                            Chcesz wypróbować inne ćwiczenia bez wykupywania treningu ? Mamy dla ciebie także filmy
                            instruktażowe.
                        </b></p>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default About_us_traits;