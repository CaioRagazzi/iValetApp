import {runInAction} from 'mobx';
import axios from '../services/axios';
import {showInformation} from '../components/toast';

export default class CaixaStore {
  loading = false;

  isCaixaOpened = false;

  constructor(rootStore) {
    this.authStore = rootStore.authStore;
  }

  async openCloseCaixa() {
    runInAction(() => {
      this.loading = true;
    });
    if (this.isCaixaOpened) {
      await axios
        .post('caixa/closeCaixa', null, {
          params: {
            companyId: this.authStore.companyId,
          },
        })
        .then((res) => {
          runInAction(() => {
            this.isCaixaOpened = false;
          });
          showInformation('Caixa fechado com sucesso!');
        })
        .catch((err) => {});
    } else {
      await axios
        .post('caixa/openCaixa', null, {
          params: {
            companyId: this.authStore.companyId,
          },
        })
        .then((res) => {
          runInAction(() => {
            this.isCaixaOpened = true;
          });
          showInformation('Caixa aberto com sucesso!');
        })
        .catch((err) => {});
    }
    runInAction(() => {
      this.loading = false;
    });
  }

  getOpenedCaixa() {
    runInAction(() => {
      this.loading = true;
    });
    axios
      .get(`caixa/openedCaixa/${this.authStore.companyId}`)
      .then((res) => {
        if (res.data.id) {
          runInAction(() => {
            this.isCaixaOpened = true;
          });
          runInAction(() => {
            this.loading = false;
          });
        }
      })
      .catch((err) => {
        if (err.response.data.message === 'Theres no opened Caixa') {
          runInAction(() => {
            this.isCaixaOpened = false;
          });
          runInAction(() => {
            this.loading = false;
          });
        }
      });
  }
}
