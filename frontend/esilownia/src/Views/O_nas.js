import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function O_nas() {
  return (
    <div className="o_nas pb-5">
        <h1 className="display-1 text-center"> O nas</h1>
        <div class="container text-center border radius mt-4 mb-4 shadow" id="linia_nas">
          <h1 class="font-weight-light">Jaki jest cel aplikacji?</h1>
            <div class="row mt-4">
              <div class="col-lg-8">
                <img
                  class="img-fluid rounded mb-4 mb-lg-4"
                  src="https://wallpapercave.com/wp/wp5559316.jpg"
                  alt=""
                  />
                </div>
                <div class="col-lg-4 font-weight-light">
                  <h4 class="font-weight-light">Cel</h4>
                    <ul>
                      <li>
                        Aplikacja która wspiera ludzi nie chcący, nie mogący pójść samemu na siłownię.
                      </li>
                      <li>
                        Zachęcenie ludzi to zdrowego trybu życia.
                      </li>
                      <li>
                        Umożliwienie trenerom pracy online na własnych warunkach.
                      </li>
                    </ul>
                    <h4 class="font-weight-light">Kim jesteśmy?</h4>
                    <p>Jesteśmy studentami 4-tego roku na Polsko Japońskiej Akademii Technik Komputerowych w Gdańsku.</p>
                </div>
              </div>
        </div>
      </div>
  );
}

export default O_nas;