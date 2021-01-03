import {createContext} from 'react';
import MonthlyPriceStore from './monthlyPrices';
import AuthStore from './authStore';
import CaixaStore from './caixaStore';
import GatewayStore from './gatewayStore';
import PriceStore from './priceStore';

class RootStore {
  constructor() {
    this.authStore = new AuthStore(this);
    this.caixaStore = new CaixaStore(this);
    this.gatewayStore = new GatewayStore(this);
    this.priceStore = new PriceStore(this);
    this.monthlyStore = new MonthlyPriceStore(this);
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext();
