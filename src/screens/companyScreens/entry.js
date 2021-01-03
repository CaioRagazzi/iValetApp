import React, {useContext, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {GatewayContext} from '../../contexts/gateway';
import {StoreContext} from '../../store/rootStore';
import CardCar from '../../components/cardCar';
import OpenDrawerIcon from '../../components/openDrawerIcon';
import {stylesDefault} from '../../styles/defaultStyles';
import {observer} from 'mobx-react-lite';

const Entry = ({navigation}) => {
  const {gatewayStore} = useContext(StoreContext);
  useEffect(() => {
    gatewayStore.init();
    gatewayStore.getOpenedCars();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: 'Entrada',
      headerLeft: () => (
        <OpenDrawerIcon onPress={() => navigation.toggleDrawer()} />
      ),
    });
  }, [navigation]);

  return (
    <View style={stylesDefault.mainContainer}>
      <FlatList
        refreshing={gatewayStore.loading}
        onRefresh={gatewayStore.getOpenedCars}
        data={gatewayStore.openedTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <CardCar
            data={item}
            onPress={() =>
              navigation.navigate('Details', {transactionParam: item})
            }
          />
        )}
      />
    </View>
  );
};

export default observer(Entry);
