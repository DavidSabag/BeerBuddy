import React, { useRef, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BeersStore } from "../../../stores/index";
import "./Ranl.scss";

const Rank = ({ id, rank }) => {
  const beersStore = useContext(BeersStore);
  const selectRef = useRef();
  useEffect(() => {
    selectRef.current.value = rank || '1';
  }, [selectRef, rank]);

  return (
    <>
       <lable className="rk-lbl"> Rank: </lable>
      <select
        ref={selectRef}
        onClick={(e) => {
          e.stopPropagation();
          beersStore.setRank(selectRef.current.value, id);
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </>
  );
};

export default observer(Rank);
