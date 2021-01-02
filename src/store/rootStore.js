import {createContext} from 'react';
import AuthStore from './authStore';
import CaixaStore from './caixaStore';

class RootStore {
  constructor() {
    this.authStore = new AuthStore(this);
    this.caixaStore = new CaixaStore(this);
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext();
