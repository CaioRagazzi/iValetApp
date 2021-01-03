import {runInAction, makeObservable, observable, action} from 'mobx';
import socketIo from 'socket.io-client';
import axios from '../services/axios';

export default class GatewayStore {
  io = null;

  openedTransactions = [];

  finishedTransactions = [];

  loading = false;

  constructor(rootStore) {
    makeObservable(this, {
      io: observable,
      openedTransactions: observable,
      finishedTransactions: observable,
      loading: observable,
      init: action,
      addOpenedTransactions: action,
      addFinishedTransactions: action,
      getOpenedCars: action,
      getFinishedCars: action,
    });
    this.authStore = rootStore.authStore;
  }

  init() {
    const socket = socketIo.connect('http://192.168.0.6:8085/', {
      query: {token: this.authStore.token},
    });
    this.io = socket;

    socket
      .on(`openedTransactions:company:${this.authStore.companyId}`, (msg) => {
        console.log(msg);
        this.addOpenedTransactions(msg);
      })
      .on(`finishedTransactions:company:${this.authStore.companyId}`, (msg) => {
        this.addFinishedTransactions(msg);
      })
      .on('connect', () => {
        console.log('connected');
      })
      .on('disconnect', () => {
        console.log('disconnected');
      });
  }

  addOpenedTransactions(msg) {
    runInAction(() => {
      this.loading = true;
    });
    runInAction(() => {
      this.openedTransactions = msg;
    });
    runInAction(() => {
      this.loading = false;
    });
  }

  addFinishedTransactions(msg) {
    runInAction(() => {
      this.loading = true;
    });
    runInAction(() => {
      this.finishedTransactions = msg;
    });
    runInAction(() => {
      this.loading = false;
    });
  }

  getOpenedCars() {
    runInAction(() => {
      this.loading = true;
    });
    axios
      .get(`transaction/opened/${this.authStore.companyId}`)
      .then((res) => {
        console.log(res.data);
        this.addOpenedTransactions(res.data);
        runInAction(() => {
          this.loading = false;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.loading = false;
        });
      });
  }

  getFinishedCars() {
    console.log('oi');
    console.log(this.authStore.companyId);
    axios
      .get(`transaction/finished/${this.authStore.companyId}`)
      .then((res) => {
        this.addFinishedTransactions(res.data);
      })
      .catch(() => {});
  }
}
