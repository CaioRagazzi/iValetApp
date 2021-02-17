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
        console.log(res.data);
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

  async editMonthlyPrice(monthlyPrice) {
    await axios
      .patch(`MonthlyPrices/${monthlyPrice.id}`, {
        price: monthlyPrice.price,
        companyId: this.authStore.companyId,
        name: monthlyPrice.name,
        description: monthlyPrice.description,
      })
      .then((res) => {
        this.getPrices();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  async createMonthlyPrice(monthlyPrice) {
    await axios
      .post('MonthlyPrices', {
        price: monthlyPrice.price,
        companyId: this.authStore.companyId,
        name: monthlyPrice.name,
        description: monthlyPrice.description,
      })
      .then((res) => {
        runInAction(() => {
          this.prices = [...this.prices, monthlyPrice];
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  async deleteMonthlyPrice(monthlyPriceId) {
    await axios
      .delete(`MonthlyPrices/${monthlyPriceId}`)
      .then((res) => {
        runInAction(() => {
          this.prices = this.prices.filter((item) => {
            return item.id !== monthlyPriceId;
          });
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
}
