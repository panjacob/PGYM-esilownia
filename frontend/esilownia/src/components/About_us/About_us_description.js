import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function About_us_description() {
    return (
        <div className="about_us_description">
            <div className="text-center border radius mt-4 mb-4 shadow">

                <h1 className="font-weight-light mt-4">O nas</h1>
                <hr width="15%" color="black"/>

                <div className="row text-center mx-auto" style={{padding: "2% 10% 5% 10%"}}>
                    <b>
                        <p>
                            E-Gym serwis z innowacyjnymi rozwiazaniami pozwalajacy na trening z wybranego przez siebie
                            miejsca w czasie rzeczywistym. Trening personalny , grupowy czy moze osobisty z użyciem
                            naszych filmów instruktażowych ? Ty wybierasz jak, kiedy lub z kim ćwiczysz. Możesz także
                            współtworzyć nasza społeczność i komunikować sie innymi użytkownikami poprzez Forum. Teraz
                            nie musisz już tracić czasu na dojazdy na siłownie z rana lub po pracy.
                        </p>
                        <p>
                            Pamietaj w zdrowym ciele zdrowy duch
                            wiec nie trać czasu i zacznij ćwiczyc z E-Gym już dziś !
                        </p>
                    </b>
                </div>

            </div>
        </div>
    );
}

export default About_us_description;