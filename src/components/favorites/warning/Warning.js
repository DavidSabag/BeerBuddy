import React, { useRef, useContext } from "react";
import { observer } from "mobx-react-lite";
import { BeersStore } from "../../../stores/index";
import Button from "react-bootstrap/Button";
import { useToasts } from "react-toast-notifications";

const Warning = () => {
  const beersStore = useContext(BeersStore);
  const tostRef = useRef();
  const { removeAllToasts } = useToasts();
  return (
    <>
      <div ref={tostRef}>
        <h4>Are you sure you whant to remove all favorites?</h4>
        <Button type="button" className="btn btn-danger" onClick={() => {
            removeAllToasts()
            beersStore.updateFavorite()
            beersStore.favorites = [];
            
        }}>
          Yes
        </Button>
      </div>
    </>
  );
};

export default observer(Warning);
