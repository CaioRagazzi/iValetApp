import React, {useContext, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {GatewayContext} from '../../contexts/gateway';
import CardCar from '../../components/cardCar';
import OpenDrawerIcon from '../../components/openDrawerIcon';

export default function Finished({navigation}) {
  const {finishedTransactions, getFinishedCars, loading} = useContext(
    GatewayContext,
  );

  useEffect(() => {
    navigation.setOptions({
      title: 'Saída',
      headerLeft: () => (
        <OpenDrawerIcon onPress={() => navigation.toggleDrawer()} />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <FlatList
        refreshing={loading}
        onRefresh={getFinishedCars}
        data={finishedTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <CardCar data={item} />}
      />
    </View>
  );
}
