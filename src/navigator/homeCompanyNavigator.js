import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import IconFeather from 'react-native-vector-icons/Feather';
import IconOcticons from 'react-native-vector-icons/Octicons';
import {Icon} from 'native-base';

import CustomDrawerContent from './customDrawer';
import HomeCompanyScreen from '../screens/companyScreens/home';
import FormCarEntryScreen from '../screens/companyScreens/formCarEntry';
import EntryScreen from '../screens/companyScreens/entry';
import CarDetailsScreen from '../screens/companyScreens/carDetails';
import FinishedScreen from '../screens/companyScreens/finished';
import PricesScreen from '../screens/companyScreens/price/prices';
import CaixaScreen from '../screens/companyScreens/caixa';
import HandlePriceScreen from '../screens/companyScreens/price/handlePrice';
import ListMensalistasScreen from '../screens/companyScreens/mensalistas/listMensalistas';
import MensalistasScreen from '../screens/companyScreens/mensalistas';
import AddMensalistasScreen from '../screens/companyScreens/mensalistas/addMensalista';
import RegisterMensalistaScreen from '../screens/companyScreens/mensalistas/registerMensalista';
import MonthlyPricesScreen from '../screens/companyScreens/mensalistas/monthlyPrices';
import HandleMonthlyPricesScreen from '../screens/companyScreens/mensalistas/handleMonthlyPrices';
import {GatewayProvider} from '../contexts/gateway';
import {PriceProvider} from '../contexts/price';
import {CaixaProvider} from '../contexts/caixa';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeCompanyNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeTabNavigator} />
      <Drawer.Screen name="Prices" component={PricesStackNavigator} />
      <Drawer.Screen name="Caixa" component={CaixaStackNavigator} />
      <Drawer.Screen name="Mensalistas" component={MensalistasStackNavigator} />
    </Drawer.Navigator>
  );
}

function MensalistasStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#4a148c'},
        headerTitleStyle: {color: '#ffffff'},
      }}>
      <Stack.Screen name="Mensalistas" component={MensalistasScreen} />
      <Stack.Screen name="ListMensalistas" component={ListMensalistasScreen} />
      <Stack.Screen name="AddMensalista" component={AddMensalistasScreen} />
      <Stack.Screen
        name="RegisterMensalista"
        component={RegisterMensalistaScreen}
      />
      <Stack.Screen name="MonthlyPrices" component={MonthlyPricesScreen} />
      <Stack.Screen
        name="HandleMonthlyPrices"
        component={HandleMonthlyPricesScreen}
      />
    </Stack.Navigator>
  );
}

function CaixaStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#4a148c'},
        headerTitleStyle: {color: '#ffffff'},
      }}>
      <Stack.Screen name="Caixa" component={CaixaScreen} />
    </Stack.Navigator>
  );
}

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: '#ffffff',
        activeBackgroundColor: '#7c43bd',
        inactiveBackgroundColor: '#7c43bd',
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Icon
                type="MaterialIcons"
                name="home"
                style={{color: '#ffffff'}}
              />
            ) : (
              <IconOcticons name="home" size={23} color="#ffffff" />
            ),
        }}
      />
      <Tab.Screen
        name="Entrada"
        component={EntryStackNavigator}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <IconFeather name="arrow-up-circle" size={28} color="#ffffff" />
            ) : (
              <IconFeather name="arrow-up" size={24} color="#ffffff" />
            ),
        }}
      />
      <Tab.Screen
        name="Saida"
        component={FinishedStackNavigator}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <IconFeather name="arrow-down-circle" size={28} color="#ffffff" />
            ) : (
              <IconFeather name="arrow-down" size={24} color="#ffffff" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#4a148c'},
        headerTitleStyle: {color: '#ffffff'},
      }}>
      <Stack.Screen name="Home" component={HomeCompanyScreen} />
      <Stack.Screen
        name="FormEntryCar"
        component={FormCarEntryScreen}
        options={{title: 'Formulário Entrada'}}
      />
    </Stack.Navigator>
  );
}

function EntryStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#4a148c'},
        headerTitleStyle: {color: '#ffffff'},
        headerTintColor: 'white',
      }}>
      <Stack.Screen name="Entrada" component={EntryScreen} />
      <Stack.Screen name="Details" component={CarDetailsScreen} />
    </Stack.Navigator>
  );
}

function FinishedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#4a148c'},
        headerTitleStyle: {color: '#ffffff'},
      }}>
      <Stack.Screen name="Saida" component={FinishedScreen} />
    </Stack.Navigator>
  );
}

function PricesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#4a148c'},
        headerTitleStyle: {color: '#ffffff'},
      }}>
      <Stack.Screen name="Prices" component={PricesScreen} />
      <Stack.Screen name="HandlePrice" component={HandlePriceScreen} />
    </Stack.Navigator>
  );
}

export default HomeCompanyNavigator;
