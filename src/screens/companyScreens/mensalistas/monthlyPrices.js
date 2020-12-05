import React, {useEffect, useContext, useState, useCallback} from 'react';
import {View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import axios from '../../../services/axios';
import {AuthContext} from '../../../contexts/auth';
import {showError} from '../../../components/toast';
import HeaderPlusIcon from '../../../components/HeaderPlusIcon';
import {HeaderBackButton} from '@react-navigation/stack';

export default function MonthlyPrices({navigation}) {
  const {companyId} = useContext(AuthContext);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

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
    getPrices();
  }, [getPrices, navigation]);

  const getPrices = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`monthlyPrices/${companyId}`)
      .then((res) => {
        setPrices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        showError('Erro ao carregar tabelas de preços!');
      });
  }, [companyId]);

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
        data={prices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={() => getPrices()}
      />
    </View>
  );
}
