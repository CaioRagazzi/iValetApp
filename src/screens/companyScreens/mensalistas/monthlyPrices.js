import React, {useEffect, useContext} from 'react';
import {View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {StoreContext} from '../../../store/rootStore';
import HeaderPlusIcon from '../../../components/HeaderPlusIcon';
import {HeaderBackButton} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';

const MonthlyPrices = ({navigation}) => {
  const {monthlyStore} = useContext(StoreContext);

  useEffect(() => {
    navigation.setOptions({
      title: 'Tabela de Preços',
      headerRight: () => (
        <HeaderPlusIcon
          onPress={() => navigation.navigate('HandleMonthlyPrices')}
        />
      ),
      headerLeft: () => (
        <HeaderBackButton
          tintColor="#ffffff"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
    monthlyStore.getPrices();
  }, [monthlyStore, navigation]);

  const renderItem = ({item}) => {
    return (
      <ListItem
        bottomDivider
        onPress={() =>
          navigation.navigate('HandleMonthlyPrices', {price: item})
        }>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
    <View>
      <FlatList
        data={monthlyStore.prices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={monthlyStore.loading}
        onRefresh={() => monthlyStore.getPrices()}
      />
    </View>
  );
};

export default observer(MonthlyPrices);
