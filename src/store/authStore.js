import {action, observable, runInAction, makeObservable, computed} from 'mobx';
import axios from '../services/axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthStore {
  splash = true;

  authenticated = false;

  logged = false;

  type = 0;

  loading = false;

  error = false;

  companyId = 0;

  token = '';

  constructor(value) {
    makeObservable(this, {
      splash: observable,
      authenticated: observable,
      logged: observable,
      type: observable,
      loading: observable,
      error: observable,
      companyId: observable,
      token: observable,
      logOut: action,
      logIn: action,
      setToken: action,
    });
    this.value = value;
  }

  setToken(token) {
    runInAction(() => {
      this.token = token;
    });
  }

  logIn(username, password) {
    runInAction(() => {
      this.authenticated = false;
    });
    runInAction(() => {
      this.loading = true;
    });
    axios
      .post('/auth', {
        username: username,
        password: password,
      })
      .then(async (res) => {
        if (res.data.access_token) {
          await AsyncStorage.setItem('access_token', res.data.access_token);
          runInAction(() => {
            this.authenticated = true;
          });
        }
      })
      .catch(() => {
        runInAction(() => {
          this.authenticated = false;
        });
        runInAction(() => {
          this.loading = false;
        });
        runInAction(() => {
          this.error = true;
        });
        setTimeout(() => {
          runInAction(() => {
            this.error = false;
          });
        }, 3000);
      });
  }

  async logOut() {
    await AsyncStorage.clear();
    runInAction(() => {
      this.loading = false;
    });
    runInAction(() => {
      this.authenticated = false;
    });
    runInAction(() => {
      this.logged = false;
    });
  }

  setNotLoggedIn() {
    runInAction(() => {
      this.type = 0;
    });
    runInAction(() => {
      this.splash = false;
    });
    runInAction(() => {
      this.logged = false;
    });
  }

  setLoggedIn(type, companyId) {
    runInAction(() => {
      this.type = type;
    });
    runInAction(() => {
      this.logged = true;
    });
    runInAction(() => {
      this.companyId = companyId;
    });
    runInAction(() => {
      this.splash = false;
    });
  }
}
