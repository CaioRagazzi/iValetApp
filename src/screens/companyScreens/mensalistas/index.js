import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import OpenDrawerIcon from '../../../components/openDrawerIcon';
import {ListItem} from 'react-native-elements';
import IconIonicons from 'react-native-vector-icons/Ionicons';

export default function Mensalistas({navigation}) {
  useEffect(() => {
    navigation.setOptions({
      title: 'Mensalistas',
      headerLeft: () => (
        <OpenDrawerIcon onPress={() => navigation.toggleDrawer()} />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate('MonthlyPrices')}>
        <IconIonicons name="cash-outline" color="#000" size={20} />
        <ListItem.Content>
          <ListItem.Title>Tabelas de Preço</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem
        bottomDivider
        onPress={() => navigation.navigate('ListMensalistas')}>
        <IconIonicons name="people-outline" color="#000" size={20} />
        <ListItem.Content>
          <ListItem.Title>Clientes</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
