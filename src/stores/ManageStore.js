import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";

class ManageStore {
  @observable paginationRange = [1, 2, 3, 4, 5];
  @observable isMarked = true;
  @observable active = 1;
  @observable isFavorite = false;

  constructor() {
    makeObservable(this);
  }
  @action
  toggleMarkedRoutes() {
    this.isMarked = !this.isMarked;
  }
  @action
  getPaginationRange(start) {
    this.paginationRange = Array.from({ length: 5 }, (_, i) => i + start);
  }

  @action
  setActive(num) {
    this.active = num;
  }

  @action
  toggleFavorite(imgRef, favorite, unfavorite) {
    if (imgRef.current.src.includes("unfavorite")) {
      imgRef.current.src = favorite;
    } else {
      imgRef.current.src = unfavorite;
    }
  }
}

export default createContext(new ManageStore());
