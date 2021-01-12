import React, { useRef, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import { observer } from "mobx-react-lite";
import { ManageStore } from "../../stores/index";
import Cardpopover from "./cardpopover/Cardpopover";
import noImg from "../../assets/img/No_image.png";
import favorite from "../../assets/img/favorite.png";
import unfavorite from "../../assets/img/unfavorite.png";
import "./Card.scss";

const Card = ({ name, image_url, tagline, description, brewers_tips }) => {
  const manageStore = useContext(ManageStore);
  const toggleFavorite = manageStore.toggleFavorite;
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
          src={unfavorite}
          alt=""
          className="favorite"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(imgRef, favorite, unfavorite);
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
      </div>
    </>
  );
};

export default observer(Card);
