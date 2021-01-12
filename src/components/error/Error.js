import React, { useContext } from "react";
import { BeersStore } from "../../stores/index";
import { observer } from "mobx-react-lite";

const Error = () => {
  const beersStore = useContext(BeersStore);
  const {errType, msg} = beersStore.error;
  return (
    <>
        <h1 className="text-danger"> {errType} </h1>
        <h3 className="text-danger"> {msg} </h3>

    </>
  );
};

export default observer(Error);
