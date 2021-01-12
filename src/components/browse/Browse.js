import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { BeersStore } from "../../stores/index";
import Card from "../card/Card";
import PaginationBar from "./paginationBar/PaginationBar";
import SearchBox from "./searchBox/SearchBox";
import Error from "./../error/Error";
import { ToastProvider } from "react-toast-notifications";
import "./Browse.scss";

const Browse = () => {
  const beersStore = useContext(BeersStore);
  const { beers, status } = beersStore;

  useEffect(() => {
    beersStore.getBeers("1");
  }, [beersStore]);
  return (
    <>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={30000}
      >
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
      </ToastProvider>
    </>
  );
};

export default observer(Browse);
