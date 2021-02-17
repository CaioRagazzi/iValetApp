import {runInAction, makeAutoObservable} from 'mobx';
import axios from '../services/axios';
import {showError} from '../components/toast';

export default class MonthlyCustomerStore {
  placa = '';
  name = '';
  email = '';
  phone = '';
  brand = '';
  model = '';
  price = {};

  constructor(rootStore) {
    makeAutoObservable(this);
    this.authStore = rootStore.authStore;
  }

  resetFields() {
    this.placa = '';
    this.name = '';
    this.email = '';
    this.phone = '';
    this.brand = '';
    this.model = '';
    this.price = {};
  }

  setPlaca(value) {
    this.placa = value;
  }

  setName(value) {
    this.name = value;
  }

  setEmail(value) {
    this.email = value;
  }

  setPhone(value) {
    this.phone = value;
  }

  setBrand(value) {
    this.brand = value;
  }

  setModel(value) {
    this.model = value;
  }

  setPrice(value) {
    this.price = value;
  }
}
