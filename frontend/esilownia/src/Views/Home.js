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
          <div class="col-lg-5">
            <h1 class="font-weight-light">Home</h1>
            <p>
              Strona domowa
            </p>
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
       <div class="container">
          <div class="row text-center">
            <div class="col-md-4">
              <div class="col-md-12 border rounded">
                <h2 class="font-weight-light">Starter</h2>
                <p class="font-weight-light">30h treningu</p>
                <p class="font-weight-light">2 tyg diety</p>
                <button type="button" class="btn btn-lg">$20</button>
              </div>
            </div>
            <div class="col-md-4">
              <div class="col-md-12 border rounded">
                <h2 class="font-weight-light">Classic</h2>
                <p class="font-weight-light">60h treningu</p>
                <p class="font-weight-light">1.5 mesiac diety</p>
                <button type="button" class="btn btn-lg">$35</button>
              </div>
            </div>
            <div class="col-md-4">
              <div class="col-md-12 border rounded">
                <h2 class="font-weight-light">Premium</h2>
                <p class="font-weight-light">120h treningu</p>
                <p class="font-weight-light">2 mesiac diety</p>
                <button type="button" class="btn btn-lg">$60</button>
              </div>
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
