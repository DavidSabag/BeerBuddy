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
          <Route path="/browse" component={Browse} />
          <Route path="/favorites" component={Favorites} />
          <Redirect from="/" to={"/browse"} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
