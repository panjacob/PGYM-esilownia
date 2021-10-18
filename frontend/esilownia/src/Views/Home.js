import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="https://riotopgym.pl/wp-content/uploads/2020/06/IMG-3651.jpg"
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
        <h1 class="display-1">Czym się zajmujemy</h1>
        <div class="container align-items-center my-5">
          <div class="container-lg-7">
              <img
                class="img-fluid rounded mb-4 mb-lg-0"
                src="https://riotopgym.pl/wp-content/uploads/2020/06/IMG-3651.jpg"
                alt=""
              />
            </div>
          </div>
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
