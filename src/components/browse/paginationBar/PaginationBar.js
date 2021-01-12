import React, { useContext } from "react";
import Pagination from "react-bootstrap/Pagination";
import { BeersStore, ManageStore } from "../../../stores/index";
import { observer } from "mobx-react-lite";
import "./PaginationBar.scss";

const PaginationBar = () => {
  const beersStore = useContext(BeersStore);
  const manageStore = useContext(ManageStore);
  const { active, paginationRange } = manageStore;
  let startPoint = paginationRange[0];
  let endIndex = paginationRange.length - 1;
  let endPoint = paginationRange[endIndex] + 1;

  return (
    <>
      <Pagination className="pag-container">
        <Pagination.First
          onClick={() => {
            beersStore.setIsNextPage(true);
            manageStore.getPaginationRange(1);
            
          }}
          className={startPoint === 1 ? "disabled" : ""}
        />
        <Pagination.Prev
          className={startPoint === 1 ? "disabled" : ""}
          onClick={() => {
            beersStore.setIsNextPage(true);
            manageStore.getPaginationRange(--startPoint);
            
          }}
        />
        {manageStore.paginationRange.map((pNum, key) => (
          <Pagination.Item
            key={key}
            onClick={() => {
              manageStore.setActive(pNum);
              beersStore.getBeers(pNum);
              
            }}
            className={pNum === active ? "active" : ""}
          >
            {pNum}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={async () => {
            await beersStore.getBeers(endPoint, true);
            manageStore.getPaginationRange(++startPoint);
          }}
          className={beersStore.isNextPage ? "" : "disabled"}
        />
      </Pagination>
    </>
  );
};

export default observer(PaginationBar);
