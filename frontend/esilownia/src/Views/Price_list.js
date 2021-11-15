import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import OfertaCennik from "../components/Price_list/Price_list_offer";
import OpisCennik from "../components/Price_list/Price_list_description";


function Price_list() {
    return (
        <div className="price_list">
            <div className="container">

                    <OfertaCennik></OfertaCennik>
                    <OpisCennik></OpisCennik>

            </div>
        </div>
    );
}

export default Price_list;