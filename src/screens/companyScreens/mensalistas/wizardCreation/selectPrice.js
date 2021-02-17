import {observer} from 'mobx-react-lite';
import React, {useEffect, useContext} from 'react';
import {View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {HeaderBackButton} from '@react-navigation/stack';
import {StoreContext} from '../../../../store/rootStore';

const SelectPriceScreen = ({navigation}) => {
  const {monthlyStore, monthlyCustomerStore} = useContext(StoreContext);
  useEffect(() => {
    navigation.setOptions({
      title: 'Selecione Tabela de preço',
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
  }, [navigation, monthlyStore]);

  const renderItem = ({item}) => {
    return (
      <ListItem bottomDivider onPress={() => handleSelectPrice(item)}>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>$ {item.price}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  const handleSelectPrice = (item) => {
    monthlyCustomerStore.setPrice(item);
    navigation.navigate('SummaryCustomerMonthly');
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

export default observer(SelectPriceScreen);
