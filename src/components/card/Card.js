import React, { useRef, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { observer } from "mobx-react-lite";
import { ManageStore, BeersStore } from "../../stores/index";
import Cardpopover from "./cardpopover/Cardpopover";
import noImg from "../../assets/img/No_image.png";
import favorite from "../../assets/img/favorite.png";
import unfavorite from "../../assets/img/unfavorite.png";
import Rank from "../favorites/rank/Rank";
import WarningCard from "../../components/favorites/warning/WarningCard";
import "./Card.scss";

const Card = ({
  id,
  name,
  image_url,
  tagline,
  description,
  brewers_tips,
  isFavorite,
  isFromFav,
  rank,
}) => {
  const manageStore = useContext(ManageStore);
  const beersStore = useContext(BeersStore);
  const toggleFavoriteStar = manageStore.toggleFavoriteStar;
  const imgRef = useRef();
  const cardRef = useRef();
  const { addToast } = useToasts();
  return (
    <>
      <div
        className="loading between"
        onClick={() => {
          addToast(
            <Cardpopover
              {...{ name, image_url, tagline, description, brewers_tips }}
            />,
            {
              appearance: "info",
              autoDismiss: true,
            }
          );
        }}
        ref={cardRef}
      >
        <label className="name-lbl">{name}</label>
        <img
          ref={imgRef}
          src={isFavorite ? favorite : unfavorite}
          alt=""
          className="favorite"
          onClick={(e) => {
            e.stopPropagation();
            if (isFavorite && isFromFav) {
              addToast(<WarningCard {...{id,cardRef,imgRef,isFavorite}}/>, {
                appearance: "warning",
                autoDismiss: true,
              });
            }else{
              beersStore.toggleFavorite(id);
              toggleFavoriteStar(imgRef, isFavorite);

            }            
          }}
        />
        <img
          src={image_url ? image_url : noImg}
          onLoad={() => {
            cardRef.current.className =
              "text-white bg-primary mb-4 between card-cont ";
          }}
          alt="img"
          className={image_url ? "card-img" : "card-img stretch"}
        />
        {isFromFav ? <Rank {...{ id, rank }} /> : ""}
      </div>
    </>
  );
};

export default observer(Card);
