import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Header from "../components/header/Header";
import Browse from "../components/browse/Browse";
import Favorites from "../components/favorites/Favorites";
import "../styles/main.scss";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/home-assignment/browse" component={Browse} />
          <Route path="/home-assignment/favorites" component={Favorites} />
          <Redirect from="/" to={"/home-assignment/browse"} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
