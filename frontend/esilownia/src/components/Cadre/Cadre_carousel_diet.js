import React from "react";
import {Carousel} from "react-bootstrap";
import {useState} from "react";
import placeholder from "../../imgs/placeholder.jpg"

function Karuzela_dietetycy() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>

            <Carousel.Item>

                <img
                    className="d-block w-100"
                    src={placeholder}
                    alt="slide1"
                />
                <Carousel.Caption>
                    <h3 className="font-weight-light">Jan Pudzianowski</h3>
                    <p className="font-weight-light">Licencjownowany dietetyk, prowadzący Kulturystów.</p>
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>

                <img
                    className="d-block w-100"
                    src={placeholder}
                    alt="slide2"
                />
                <Carousel.Caption>
                    <h3 className="font-weight-light">Paweł Karmowski</h3>
                    <p className="font-weight-light">Dietetyk, pasjonata zdrowego żywienia.</p>
                </Carousel.Caption>

            </Carousel.Item>

        </Carousel>
    );
}

export default Karuzela_dietetycy;