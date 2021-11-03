import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Template/Header";
import Footer from "./components/Template/Footer";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Register from "./Views/Register";
import Cadre from "./Views/Cadre";
import Trainings from "./Views/Trainings";
import Diet from "./Views/Diet";
import ONas from "./Views/About_us";
import Price_list from "./Views/Price_list";
import Account from "./Views/Account";
import Dashboard from "./Views/Dashboard";
import KontoEdycja from "./Views/Account_edit";

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <Switch>
                    <Route path="/o_nas" exact component={() => <ONas/>}/>
                    <Route path="/cennik" exact component={() => <Price_list/>}/>
                    <Route path="/" exact component={() => <Home/>}/>
                    <Route path="/kadra" exact component={() => <Cadre/>}/>
                    <Route path="/treningi" exact component={() => <Trainings/>}/>
                    <Route path="/dieta" exact component={() => <Diet/>}/>
                    <Route path="/login" exact component={() => <Login/>}/>
                    <Route path="/register" exact component={() => <Register/>}/>
                    <Route path="/konto" exact component={() => <Account/>}/>
                    <Route path="/konto_edycja" exact component={() => <KontoEdycja/>}/>
                    <Route path="/dashboard" exact component={() => <Dashboard/>}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
