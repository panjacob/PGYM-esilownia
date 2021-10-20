import React from "react";
import { Link, withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from "../Logout/Logout";

function Header(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-secondary">
        <div class="container">
          <Link class="navbar-brand" to="/">
            E-Siłownia
          </Link>
          <div>
            <ul class="navbar-nav d-flex">

            <li
                class={`nav-item m-1 ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                </Link>
              </li>
              
              <li
                class={`nav-item m-1 ${
                  props.location.pathname === "/o_nas" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/o_nas">
                  O nas
                </Link>
              </li>
              <li
                class={`nav-item m-1 ${
                  props.location.pathname === "/cennik" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/cennik">
                  Cennik
                </Link>
              </li>

              <li
                class={`nav-item m-1 ${
                  props.location.pathname === "/kadra" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/kadra">
                  Kadra
                </Link>
              </li>

              <li
                class={`nav-item m-1 ${
                  props.location.pathname === "/treningi" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/treningi">
                  Treningi
                </Link>
              </li>
              
              <li
                class={`nav-item m-1 ${
                  props.location.pathname === "/dieta" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/dieta">
                  Dieta
                </Link>
              </li>

              <li 
                class={`nav-item ml-5 m-1 ${
                  props.location.pathname === "/login" ? "active" : ""
                }`}
              >
                <Link class="nav-link " to="/login">
                  Login
                </Link>
              </li>

              <li
                class={`nav-item m-1 ${
                  props.location.pathname === "/register" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/register">
                  Register
                </Link>
              </li>

              <li
                  className={`nav-item m-1 ${
                      props.location.pathname === "/" ? "active" : ""
                  }`}
              >
                <Link class="nav-link" to="/">
                  <Logout></Logout>
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Header);
