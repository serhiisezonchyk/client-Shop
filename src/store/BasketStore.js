import { makeAutoObservable } from "mobx";

export default class BasketStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._products = [];
    this._totalCount = 0;
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setProducts(products) {
    this._products = products;
  }

  setTotalCount(count) {
    this._totalCount = count;
  }

  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get products() {
    return this._products;
  }
  get totalCount() {
    return this._totalCount;
  }
}
