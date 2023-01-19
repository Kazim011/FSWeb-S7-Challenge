import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./companents/Home";
import Order from "./companents/Order";
import Contact from "./companents/Contact";
import About from "./companents/About";
import "./App.css";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/About" component={About} />
        <Route path="/pizza" component={Order} />
        <Route path="/Contact" component={Contact} />
      </Switch>
    </>
  );
};
export default App;
