import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { ManageStore } from "../../stores/index";
import Navbar from "react-bootstrap/Navbar";
import BeerImg from "../../assets/img/beer2.png";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const manageStore = useContext(ManageStore);
  const isMarked = manageStore.isMarked;
  
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Navbar.Brand>
          Beer<span className="text-muted">Buddy</span>
        </Navbar.Brand>

        <Link
          to={"/BeerBuddy/browse"}
          className={isMarked ? "mark-route" : ""}
          onClick={() => {
            manageStore.toggleMarkedRoutes();
          }}
        >
          <label className="buzz-next b-lbl"> Browse Beers </label>
          <img src={BeerImg} className="hvr-buzz-out beer-img" alt="" />
        </Link>

        <Link
          to={"/BeerBuddy/favorites"}
          className={!isMarked ? "mark-route " : ""}
          onClick={() => manageStore.toggleMarkedRoutes()}
        >
          <label className="buzz-next b-lbl"> Favorite Beers </label>
          <img src={BeerImg} className="hvr-buzz-out beer-img" alt="" />
        </Link>
      </Navbar>
    </>
  );
};

export default observer(Header);