import React from "react";
import {Carousel} from "react-bootstrap";
import {useState} from "react";
import placeholder1 from "../../imgs/diet1.jpg"
import placeholder2 from "../../imgs/diet2.jpg"
import placeholder3 from "../../imgs/diet3.jpg"

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
                    src={placeholder1}
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
                    src={placeholder2}
                    alt="slide2"
                />
                <Carousel.Caption>
                    <h3 className="font-weight-light">Paweł Karmowski</h3>
                    <p className="font-weight-light">Dietetyk, pasjonata zdrowego żywienia.</p>
                </Carousel.Caption>

            </Carousel.Item>
            <Carousel.Item>

                <img
                    className="d-block w-100"
                    src={placeholder3}
                    alt="slide3"
                />
                <Carousel.Caption>
                    <h3 className="font-weight-light">Gaweł Ignaś</h3>
                    <p className="font-weight-light">Dietetyk, zje wszystko.</p>
                </Carousel.Caption>

            </Carousel.Item>

        </Carousel>
    );
}

export default Karuzela_dietetycy;