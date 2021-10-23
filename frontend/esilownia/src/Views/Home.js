import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Oferta_trener from "../components/Home/Oferta_trener"
import Karuzela from "../components/Home/Carousel";

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZW1wdHklMjBneW18ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
              alt=""
            />
          </div>
          <div class="col-lg-5 text-black shadow-lg" id="home_start">
            <div class="content">
              <p>  </p>
              <h1 class="font-weight-light display-4">E-Siłownia</h1>
              <p class="font-weight-light">Ćwicz już dziś w swoim domu z</p>
              <h2 class="display-6 font-weight-light"> licencjonowanymi</h2>
              <p class="font-weight-light">trenerami personalnymi !</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container text-center">
        <h1 class="display-1 pb-4">Zacznij swój trening!</h1>
        <Karuzela></Karuzela>
        <button class="btn btn-lg mt-4">Zapoznaj się z ofertą</button>
        <h1 class="display-1 pb-4">Jesteś trenerem?</h1>
        <h4 class="font-weight-light pb-4">Dołącz do naszego zespołu!</h4>
        <Oferta_trener></Oferta_trener>
          <button class="btn btn-lg">Dołącz</button>
      </div>
        <div class="container">
          <div class="row">
            <div class="col m-5 text-center font-weight-light">
              Lorem ipsum pipsum 
            </div>
          </div>
        </div>
    </div>
  );
}

export default Home;
