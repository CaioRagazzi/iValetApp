import React, {useContext, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {GatewayContext} from '../../../contexts/gateway';
import {StoreContext} from '../../../store/rootStore';
import CardCar from '../../../components/cardCar';
import OpenDrawerIcon from '../../../components/openDrawerIcon';
import {observer} from 'mobx-react-lite';

const Finished = ({navigation}) => {
  const {gatewayStore} = useContext(StoreContext);

  useEffect(() => {
    navigation.setOptions({
      title: 'Saída',
      headerLeft: () => (
        <OpenDrawerIcon onPress={() => navigation.toggleDrawer()} />
      ),
    });
    gatewayStore.getFinishedCars();
  }, [navigation, gatewayStore]);

  return (
    <View>
      <FlatList
        refreshing={gatewayStore.loading}
        onRefresh={() => gatewayStore.getFinishedCars()}
        data={gatewayStore.finishedTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <CardCar data={item} />}
      />
    </View>
  );
};

export default observer(Finished);
