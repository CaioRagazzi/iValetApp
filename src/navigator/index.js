import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import LoginNavigator from './loginNavigator';
import HomeCompanyNavigator from './homeCompanyNavigator';
import HomeClientNavigator from './homeClientNavigator';
import SplashScreenNavigator from './splashNavigator';
import {StoreContext} from '../store/rootStore';

const Navigator = () => {
  const {authStore} = useContext(StoreContext);

  const getNavigator = () => {
    if (authStore.logged && authStore.type === 1) {
      return <HomeCompanyNavigator />;
    }
    if (authStore.logged && authStore.type === 2) {
      return <HomeClientNavigator />;
    }
    return <LoginNavigator />;
  };

  return (
    <NavigationContainer>
      {authStore.splash ? <SplashScreenNavigator /> : getNavigator()}
    </NavigationContainer>
  );
};

export default observer(Navigator);
