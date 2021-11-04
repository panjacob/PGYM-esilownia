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
                            Trenujesz w wybranym przez siebie miejscu. Bezpiecznie i w znajomym środowiksu bez
                            fizycznego kontaku.
                        </b></p>
                    </div>

                </div>
                <div className="col-md border rounded shadow m-1">

                    <div className="row justify-content-center" style={{padding: "10% 0% 0% 0%"}}>
                        <AiFillCar size={100}/>
                    </div>
                    <div className="row text-center mx-auto" style={{padding: "5% 15% 5% 15%"}}>
                        <p><b>Nie traczisz czasu i pieniedzy na dojazdy i stanie w korkch.</b></p>
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
                            Plan i czas treningów jest w zupełnoci zależny od ciebie. Wybierasz z kim lub kiedy chcesz
                            ćwiczyc.
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
                        <p><b>Na tej samej platformie znajdziesz siłownie , klub fintess lub porady dietetyczne.</b></p>
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