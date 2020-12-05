import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import LoginNavigator from './loginNavigator';
import HomeCompanyNavigator from './homeCompanyNavigator';
import HomeClientNavigator from './homeClientNavigator';
import SplashScreenNavigator from './splashNavigator';
import {AuthContext} from '../contexts/auth';

function Navigator() {
  const {type, logged, splash} = useContext(AuthContext);

  const getNavigator = () => {
    if (logged && type === 1) {
      return <HomeCompanyNavigator />;
    }
    if (logged && type === 2) {
      return <HomeClientNavigator />;
    }
    return <LoginNavigator />;
  };

  return (
    <NavigationContainer>
      {splash ? <SplashScreenNavigator /> : getNavigator()}
    </NavigationContainer>
  );
}

export default Navigator;
