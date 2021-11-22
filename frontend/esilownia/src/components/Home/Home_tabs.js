import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tab, Tabs} from "react-bootstrap";
import {Link} from "react-router-dom";

function HomeTabs() {
    return (
        <Tabs
            style={{fontSize:'30px'}}
            defaultActiveKey="trening"
            transition={false}
            id="home_tabs"
            className="my-5 justify-content-center"
        >
            <Tab eventKey="trening" title="Trening" className="text-center" style={{fontSize:'25px'}}>
                <p>Trenuj z Profesjonalnymi trenerami.</p>
                <p>Poznaj ich <Link to={'/kadra'}>tutaj</Link>.</p>
                <p>Podglad dostępnych treningów zobaczysz w zakładce 'Treningi' po zalogowaniu.</p>
            </Tab>
            <Tab eventKey="dieta" title="Dieta" className="text-center" style={{fontSize:'25px'}}>
                <p>Wybierz diete dostosowana do ciebie.</p>
                <p>Poznaj naszych dietetyków <Link to={'/dieta'}>tutaj</Link>.</p>
                <p>Podglad dostępnych diet zobaczysz w zakładce 'Diety' po zalogowaniu.</p>
            </Tab>
            <Tab eventKey="filmy" title="Filmy" className="text-center" style={{fontSize:'25px'}}>
                <p>Potrzebujesz wiecej informacji na temat danego ćwiczenia ?</p>
                <p>Filmy instruktażowe naszych trenerow sa dostępne w zakładce 'Treningi' po zalogowaniu.</p>
            </Tab>
        </Tabs>
    );
}

export default HomeTabs;
