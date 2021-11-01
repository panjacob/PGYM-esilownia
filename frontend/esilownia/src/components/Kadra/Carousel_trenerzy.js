import React from "react";
import {Carousel} from "react-bootstrap";
import {useState} from "react";
import placeholder from "../../imgs/placeholder.jpg"

function Karuzela_kadra() {
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
                    <h3 className="font-weight-light">Jakub Kwiatkowski</h3>
                    <p className="font-weight-light">Profesjonalny skoczek akrobata</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={placeholder}
                    alt="slide2"
                />

                <Carousel.Caption>
                    <h3 className="font-weight-light">Aleksander Bober</h3>
                    <p className="font-weight-light">Kulturysta, Mr. Universe 2014</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={placeholder}
                    alt="slide3"
                />

                <Carousel.Caption>
                    <h3 className="font-weight-light">Tymoteusz Mirski</h3>
                    <p className="font-weight-light">Trener perosnalny, "Polski król fitness"</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={placeholder}
                    alt="slide3"
                />

                <Carousel.Caption>
                    <h3 className="font-weight-light">Maciej Dudzik</h3>
                    <p className="font-weight-light">Trener dancehall</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Karuzela_kadra;