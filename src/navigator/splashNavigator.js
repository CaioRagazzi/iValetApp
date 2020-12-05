import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoadingScreen from '../screens/splashScreen';

const Stack = createStackNavigator();

function SplashScreenNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Loading"
        component={LoadingScreen}
      />
    </Stack.Navigator>
  );
}

export default SplashScreenNavigator;
