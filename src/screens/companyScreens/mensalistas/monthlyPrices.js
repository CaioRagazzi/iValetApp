import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {StoreContext} from '../../../store/rootStore';
import {Icon} from 'native-base';
import HeaderPlusIcon from '../../../components/HeaderPlusIcon';
import {HeaderBackButton} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const MonthlyPrices = ({navigation}) => {
  const {monthlyStore} = useContext(StoreContext);
  const [loadingDelete, setLoadingDelete] = useState(false);

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

  const deleteMonthlyPrice = (id) => {
    setLoadingDelete(true);
    monthlyStore.deleteMonthlyPrice(id).then(() => {
      setLoadingDelete(false);
    });
  };

  const renderItem = ({item}) => {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) => (
          <LeftActions
            progress={progress}
            dragX={dragX}
            onPress={() => deleteMonthlyPrice(item.id)}
          />
        )}>
        <ListItem
          bottomDivider
          onPress={() =>
            navigation.navigate('HandleMonthlyPrices', {price: item})
          }>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>$ {item.price}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </Swipeable>
    );
  };

  const LeftActions = ({progress, dragX, onPress}) => {
    const scale = dragX.interpolate({
      inputRange: [-40, 0],
      outputRange: [0.7, 0],
    });
    if (loadingDelete) {
      return (
        <View style={styles.mainContainerDelete}>
          <Animated.View
            style={[styles.containerDelete, {transform: [{scale}]}]}>
            <ActivityIndicator size={50} color="#FFFF" />
          </Animated.View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.mainContainerDelete} onPress={onPress}>
          <View>
            <Animated.View
              style={[styles.containerDelete, {transform: [{scale}]}]}>
              <Icon name="trash-outline" style={{color: '#E1DBD4'}} />
            </Animated.View>
          </View>
        </TouchableOpacity>
      );
    }
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

const styles = StyleSheet.create({
  mainContainerDelete: {
    backgroundColor: '#b20000',
    justifyContent: 'center',
  },
  containerDelete: {
    color: 'white',
    paddingHorizontal: 10,
    fontWeight: '600',
  },
});

export default observer(MonthlyPrices);
