import {runInAction, makeAutoObservable} from 'mobx';
import axios from '../services/axios';
import {showError} from '../components/toast';

export default class MonthlyPriceStore {
  prices = [];

  loading = false;

  constructor(rootStore) {
    makeAutoObservable(this);
    this.authStore = rootStore.authStore;
  }

  async getPrices() {
    runInAction(() => {
      this.loading = true;
    });
    await axios
      .get(`monthlyPrices/${this.authStore.companyId}`)
      .then((res) => {
        runInAction(() => {
          this.prices = res.data;
        });
        runInAction(() => {
          this.loading = false;
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        showError('Erro ao carregar tabelas de preços!');
      });
  }
}
