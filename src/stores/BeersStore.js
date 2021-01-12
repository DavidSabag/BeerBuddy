import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import beerApi from "../endpoints/beer.api";

class BeersStore {
  @observable beers = [];
  @observable favorites = [];
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
        this.updateFavorite(data);
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

  @action
  toggleFavorite(beerId) {
    for (let beer of this.beers) {
      if (beer.id === beerId) {
        beer.isFavorite = !beer.isFavorite;
        if (beer.isFavorite) this.addFavorite(beer);
        else this.removeFavorite(beerId);
      }
    }
  }

  @action
  addFavorite(favorite) {
    favorite.isFavorite = true;
    this.favorites.push(favorite);
  }

  @action
  removeFavorite(favoriteId) {
    const beer = this.favorites.find((favorite) => favorite.id === favoriteId);
    const beerIndex = this.favorites.indexOf(beer);
    this.favorites.splice(beerIndex, 1);
  }
  @action
  updateFavorite() {
    for (let fBeer of this.favorites) {
      for (let beer of this.beers) {
        if (fBeer.id === beer.id) {
          beer.isFavorite = true;
        }
      }
    }
  }
  @action
  setRank(rank, id) {
    for (let beer of this.favorites) {
      if (beer.id === id) {
        beer.rank = rank;
      }
    }
  }
}

export default createContext(new BeersStore());
