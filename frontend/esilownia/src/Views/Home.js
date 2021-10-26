import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import OfertaTrener from "../components/Home/Oferta_trener"
import Karuzela from "../components/Home/Carousel";
import OfertaUser from "../components/Home/Oferta_user";
import {Link} from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
                className="img-fluid rounded mb-4 mb-lg-0"
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZW1wdHklMjBneW18ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
              alt=""
            />
          </div>
          <div className="col-lg-5 text-black shadow-lg" id="home_start">
            <div className="content">
              <p>  </p>
              <h1 className="font-weight-light display-4">E-Siłownia</h1>
              <p className="font-weight-light">Ćwicz już dziś w swoim domu z</p>
              <h2 className="display-6 font-weight-light"> licencjonowanymi</h2>
              <p className="font-weight-light">trenerami personalnymi !</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center">
        {/* user */}
        <h1 className="display-1 pb-4">Zacznij swój trening!</h1>
        <Karuzela></Karuzela>
        <OfertaUser></OfertaUser>
        {/* trener */}
        <h1 className="display-1 pb-4 pt-4">Jesteś trenerem?</h1>
        <h4 className="font-weight-light pb-4">Dołącz do naszego zespołu!</h4>
        <OfertaTrener></OfertaTrener>
          <Link className="btn btn-lg" to="/register">Dołącz</Link>
      </div>
        <div className="container">
          <div className="row">
            <div className="col m-5 text-center font-weight-light">
              Lorem ipsum pipsum 
            </div>
          </div>
        </div>
    </div>
  );
}

export default Home;
