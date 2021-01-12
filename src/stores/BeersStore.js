import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import beerApi from "../endpoints/beer.api";

class BeersStore {
  @observable beers = [];
  @observable status = 200;
  @observable error = {};
  @observable isNextPage = true;
  @observable isSearching = false;

  constructor() {
    makeObservable(this);
  }
  @action
  async getBeers(page, next = false) {
    const { status, data, error } = await beerApi.getNextPage(page);
    this.handleApiResponse(status, data, error, next);
  }

  @action
  getFoodPairing(food) {
    if (food) {
      const filterdFood = food
        .replace(/ +(?= )/g, "")
        .split(" ")
        .join("_");

      beerApi
        .getFoodPairing(filterdFood)
        .then((res) => {
          this.isSearching = false;
          this.beers = res.data;
        })
        .catch((e) => {
          this.handleError(e.status, e.error);
        });
      this.isSearching = true;
    }
  }

  @action
  handleApiResponse(status, data, error, next) {
    if (status !== 200) {
      this.handleError(status, error);
    } else if (next) {
      this.setIsNextPage(data.length === 10);
    } else {
      setTimeout(() => {
        this.beers = [];
        this.beers = data;
      }, 0);
    }
  }

  @action
  handleError(status, error) {
    this.status = status;
    this.error = error;
  }

  @action
  setIsNextPage(bool) {
    this.isNextPage = bool;
  }
}

export default createContext(new BeersStore());
