import React, {useEffect, useContext, useState, useCallback} from 'react';
import {
  View,
  FlatList,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import HeaderPlusIcon from '../../../components/HeaderPlusIcon';
import axios from '../../../services/axios';
import {AuthContext} from '../../../contexts/auth';
import {ListItem} from 'react-native-elements';
import {PriceContext} from '../../../contexts/price';
import {showWarning} from '../../../components/toast';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import OpenDrawerIcon from '../../../components/openDrawerIcon';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../../../store/rootStore';

const Prices = ({navigation}) => {
  // const {companyId} = useContext(AuthContext);
  const {authStore, priceStore} = useContext(StoreContext);
  // const {
  //   populateFields,
  //   setTypePrice,
  //   setPrice,
  //   deletePriceByUniqueId,
  // } = useContext(PriceContext);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Preços',
      headerRight: () => (
        <HeaderPlusIcon onPress={() => navigation.navigate('HandlePrice')} />
      ),
      headerLeft: () => (
        <OpenDrawerIcon onPress={() => navigation.toggleDrawer()} />
      ),
    });

    getPrices();
  }, [navigation, authStore.companyId, getPrices]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPrices();
    });

    return unsubscribe;
  }, [navigation, getPrices]);

  const getPrices = useCallback(async () => {
    setLoading(true);
    setPrices();
    await axios
      .get(`price/${authStore.companyId}`)
      .then((res) => {
        setPrices(res.data);
        setLoading(false);
      })
      .catch(() => {
        showWarning('Erro buscando preços');
        setLoading(false);
      });
  }, [authStore.companyId]);

  const goToEditPrice = (price) => {
    priceStore.setPrice(price);
    priceStore.setTypePrice(price.type);
    priceStore.populateFields(price);
    navigation.navigate('HandlePrice', {edit: true});
  };

  const renderItem = ({item}) => {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) => (
          <LeftActions
            progress={progress}
            dragX={dragX}
            onPress={() => deletePrice(item)}
          />
        )}>
        <ListItem bottomDivider onPress={() => goToEditPrice(item)}>
          <ListItem.Content>
            <ListItem.Title>{getWeekDays(item.weekDay)}</ListItem.Title>
            <ListItem.Subtitle>
              {item.type === 1 ? 'Fixo' : 'Dinâmico'}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </Swipeable>
    );
  };

  const deletePrice = async (value) => {
    setLoadingDelete(true);
    await priceStore.deletePriceByUniqueId(value.uniqueIdPrice).then((res) => {
      if (res) {
        getPrices();
        setLoadingDelete(false);
      } else {
        setLoadingDelete(false);
      }
    });
  };

  const LeftActions = ({progress, dragX, onPress}) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
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
              <Icon name="trash-outline" size={50} color="#E1DBD4" />
            </Animated.View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const getWeekDays = (weekDays) => {
    const splited = weekDays.split('|');

    let returnString = '';
    splited.map((item) => {
      switch (item) {
        case 'MONDAY':
          returnString += 'Segunda | ';
          break;
        case 'TUESDAY':
          returnString += 'Terça | ';
          break;
        case 'WEDNESDAY':
          returnString += 'Quarta | ';
          break;
        case 'THURSDAY':
          returnString += 'Quinta | ';
          break;
        case 'FRIDAY':
          returnString += 'Sexta | ';
          break;
        case 'SATURDAY':
          returnString += 'Sábado | ';
          break;
        case 'SUNDAY':
          returnString += 'Domingo | ';
          break;
      }
    });

    return returnString;
  };

  return (
    <View>
      <FlatList
        data={prices}
        renderItem={renderItem}
        keyExtractor={(item) => item.uniqueIdPrice}
        refreshing={loading}
        onRefresh={() => getPrices()}
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

export default observer(Prices);
