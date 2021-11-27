import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import KaruzelaTrenerzy from "../components/Cadre/Cadre_carousel_training";
import KaruzelaDietetycy from "../components/Cadre/Cadre_carousel_diet";
import CadreTrainers from "../components/Cadre/Cadre_trainers";
import CadreNutritionists from "../components/Cadre/Cadre_nutritionists";

function Cadre() {
    return (
        <div className="cadre">
            <div className="container pt-4 align-items-center text-center">

                <h1 style={{"fontSize": "5vw"}} className="display-1">Poznaj naszą kadrę !</h1>

                <CadreTrainers></CadreTrainers>

                <h1 style={{"fontSize": "2vw"}} className="font-weight-light pt-4 pb-4">Wybierz z kim chcesz trenować !</h1>
                <KaruzelaTrenerzy></KaruzelaTrenerzy>

                <CadreNutritionists></CadreNutritionists>

                <h1 style={{"fontSize": "2vw"}} className="font-weight-light pt-4 pb-4">Wybierz kto ustali twoją indywidualną dietę !</h1>
                <KaruzelaDietetycy></KaruzelaDietetycy>

            </div>
        </div>
    );
}

export default Cadre;