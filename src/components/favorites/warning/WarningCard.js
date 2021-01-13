import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { BeersStore, ManageStore } from "../../../stores/index";
import Button from "react-bootstrap/Button";
import { useToasts } from "react-toast-notifications";

const WarningCard = ({ id, cardRef, imgRef, isFavorite }) => {
  const beersStore = useContext(BeersStore);
  const manageStore = useContext(ManageStore);
  const toggleFavoriteStar = manageStore.toggleFavoriteStar;

  const { removeAllToasts } = useToasts();
  return (
    <>
      <div>
        <h4>Remove this beer from favorits?</h4>
        <Button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            cardRef.current.className += " removed-item";
            setTimeout(() => {
              toggleFavoriteStar(imgRef, isFavorite);
              beersStore.toggleFavorite(id);
              removeAllToasts();
            }, 1000);
          }}
        >
          Yes
        </Button>
      </div>
    </>
  );
};

export default observer(WarningCard);
