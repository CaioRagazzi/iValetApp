import {createContext} from 'react';
import MonthlyPriceStore from './monthlyPrices';
import AuthStore from './authStore';
import CaixaStore from './caixaStore';
import GatewayStore from './gatewayStore';
import PriceStore from './priceStore';
import MonthlyCustomerStore from './monthlyCustomer';

class RootStore {
  constructor() {
    this.authStore = new AuthStore(this);
    this.caixaStore = new CaixaStore(this);
    this.gatewayStore = new GatewayStore(this);
    this.priceStore = new PriceStore(this);
    this.monthlyStore = new MonthlyPriceStore(this);
    this.monthlyCustomerStore = new MonthlyCustomerStore(this);
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext();
