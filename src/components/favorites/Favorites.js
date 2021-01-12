import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { BeersStore } from "../../stores/index";
import Card from "../card/Card";

const Favorites = () => {
  const beerStore = useContext(BeersStore);
  const favorite = beerStore.favorites;
  return (
    <>
      <div className="container-md"> 
      <label><h1 className="text-white"> Favorite<span className="text-muted">Beers</span></h1></label>
        <div>
        
          <div className="d-flex flex-wrap  justify-content-start">
            {favorite.map((beer, key) => {
              return  <Card {...beer} isFromFav={true} key={key} />
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Favorites);
