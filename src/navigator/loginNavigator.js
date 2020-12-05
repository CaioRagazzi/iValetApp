import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/login/login';
import ForgotPasswordScreen from '../screens/login/forgotPassword';
import CadastroLoginScreen from '../screens/login/cadastro';
import SelectTypeScreen from '../screens/login/selectType';

const Stack = createStackNavigator();

function LoginNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CadastroLogin"
        component={CadastroLoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectType"
        component={SelectTypeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default LoginNavigator;
