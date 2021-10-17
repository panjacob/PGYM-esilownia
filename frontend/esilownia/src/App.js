import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Header  from "./components/Template/Header";
import  Footer  from "./components/Template/Footer";
import  Home  from "./components/Home/Home";
import  Login  from "./components/Login/Login";
import  Register  from "./components/Register/Register";
import  Kadra  from "./components/Kadra/Kadra";
import  Treningi  from "./components/Treningi/Treningi";
import  Dieta  from "./components/Dieta/Dieta";
import  O_nas  from "./components/O_nas/O_nas";

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
