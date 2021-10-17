import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Header  from "./components/Template/Header";
import  Footer  from "./components/Template/Footer";
import  Home  from "./Views/Home";
import  Login  from "./Views/Login";
import  Register  from "./Views/Register";
import  Kadra  from "./Views/Kadra";
import  Treningi  from "./Views/Treningi";
import  Dieta  from "./Views/Dieta";
import  O_nas  from "./Views/O_nas";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/o_nas" exact component={() => <O_nas />} />
          <Route path="/" exact component={() => <Home />} />
          <Route path="/kadra" exact component={() => <Kadra />} />
          <Route path="/treningi" exact component={() => <Treningi />} />
          <Route path="/dieta" exact component={() => <Dieta />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/register" exact component={() => <Register />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
