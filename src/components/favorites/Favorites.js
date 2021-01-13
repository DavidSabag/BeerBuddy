import React, { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import { BeersStore, ManageStore } from "../../stores/index";
import Card from "../card/Card";
import Button from "react-bootstrap/Button";
import { useToasts } from "react-toast-notifications";
import Warning from "./warning/Warning";

import "./Favorites.scss";

const Favorites = () => {
  const beerStore = useContext(BeersStore);
  const manageStore = useContext(ManageStore);
  const favorite = beerStore.favorites;
  const containerRef = useRef();
  manageStore.containerRef = containerRef;
  const { addToast } = useToasts();
  return (
    <>
      <div className="container-md">
        <label>
          <h1 className="text-white">
            {" "}
            Favorite<span className="text-muted">Beers</span>
          </h1>
        </label>
        <Button
          variant="danger"
          className="rmv-btn"
          onClick={() => {
            addToast(
              <Warning />,
              {
                appearance: 'warning',
                autoDismiss: true,
              }
            );
          }}
        >
          Remove All
        </Button>
        <div>
          <div className="d-flex flex-wrap  justify-content-start" ref={containerRef}>
            {favorite.map((beer, key) => {
              return <Card {...beer} isFromFav={true} key={key} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Favorites);
