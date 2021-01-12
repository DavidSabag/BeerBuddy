import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { BeersStore, ManageStore } from "../../stores/index";
import Card from "../card/Card";
import PaginationBar from "./paginationBar/PaginationBar";
import SearchBox from "./searchBox/SearchBox";
import Error from "./../error/Error";
import "./Browse.scss";

const Browse = () => {
  const beersStore = useContext(BeersStore);
  const manageStore = useContext(ManageStore);
  const { beers, status } = beersStore;
  
  useEffect(() => {
    if (manageStore.isFirstLoad) {
      beersStore.getBeers("1");
      manageStore.isFirstLoad = false;
    }
  }, [beersStore, manageStore]);

  return (
    <>
      <div className="container-md">
        <SearchBox />
        {status === 200 ? (
          <div>
            <div className="d-flex flex-wrap  justify-content-start">
              {beers.map((beer, key) => (
                <Card {...beer} key={key} />
              ))}
            </div>
            <PaginationBar />
          </div>
        ) : (
          <Error />
        )}
      </div>
    </>
  );
};

export default observer(Browse);
