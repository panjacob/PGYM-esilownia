import React from "react";
import { Carousel } from "react-bootstrap";
import { useState } from "react";
import placeholder from "../../imgs/placeholder.jpg"

function Karuzela() {
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
            <h3 class="font-weight-light">Treningi personalne i grupowe</h3>
            <p class="font-weight-light">Wybierz co Ci bardziej odpowiada.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={placeholder}
            alt="slide2"
          />
  
          <Carousel.Caption>
            <h3 class="font-weight-light">Dashboard</h3>
            <p class="font-weight-light">Korzystaj z naszego Dashboardu do ustalania terminów ćwiczeń.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={placeholder}
            alt="slide3"
          />
  
          <Carousel.Caption>
            <h3 class="font-weight-light">Dieta</h3>
            <p class="font-weight-light">Wybierz odpowiadającą Ci dietę.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  
export default Karuzela;