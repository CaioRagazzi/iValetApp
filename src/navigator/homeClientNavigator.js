import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeClientScreen from '../screens/clientScreens/home';

const Stack = createStackNavigator();

function HomeClientNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeClientScreen} />
    </Stack.Navigator>
  );
}

export default HomeClientNavigator;
