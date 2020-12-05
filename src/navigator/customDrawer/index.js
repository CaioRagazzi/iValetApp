import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {AuthContext} from '../../contexts/auth';

export default function CustomDrawerContent(props) {
  const {logOut} = useContext(AuthContext);
  const [focusedDrawerItem, setFocusedDrawerItem] = useState();

  const onDrawerPress = (item) => {
    props.navigation.navigate(item);
    setFocusedDrawerItem(item);
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}>
      <View style={styles.topContainer} />
      {/* <DrawerItemList {...props} activeTintColor="#7c43bd" /> */}
      <DrawerItem
        label="Início"
        activeTintColor="#7c43bd"
        focused={focusedDrawerItem === 'Home'}
        onPress={() => onDrawerPress('Home')}
      />
      <DrawerItem
        label="Preços"
        activeTintColor="#7c43bd"
        focused={focusedDrawerItem === 'Prices'}
        onPress={() => onDrawerPress('Prices')}
      />
      <DrawerItem
        label="Caixa"
        activeTintColor="#7c43bd"
        focused={focusedDrawerItem === 'Caixa'}
        onPress={() => onDrawerPress('Caixa')}
      />
      <DrawerItem
        label="Mensalistas"
        activeTintColor="#7c43bd"
        focused={focusedDrawerItem === 'Mensalistas'}
        onPress={() => onDrawerPress('Mensalistas')}
      />
      <DrawerItem label="Logout" onPress={() => logOut()} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginTop: -4,
  },
  topContainer: {
    height: '35%',
    backgroundColor: '#4a148c',
  },
});
