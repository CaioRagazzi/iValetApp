import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, Keyboard, BackHandler} from 'react-native';
import {Card, Input, Button, Icon} from 'react-native-elements';
import {HeaderBackButton} from '@react-navigation/stack';
import axios from '../../../../services/axios';
import {observer} from 'mobx-react-lite';
import {showWarning} from '../../../../components/toast';
import {StoreContext} from '../../../../store/rootStore';

const AddMensalista = ({navigation}) => {
  const {monthlyCustomerStore, authStore} = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Cadastro Novo Mensalista',
      headerLeft: () => (
        <HeaderBackButton
          tintColor="#ffffff"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
    navigation.setOptions({
      title: 'Preço',
      headerLeft: () => (
        <HeaderBackButton
          tintColor="#ffffff"
          onPress={() => {
            navigation.goBack();
            monthlyCustomerStore.resetFields();
          }}
        />
      ),
    });
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      monthlyCustomerStore.resetFields();
      return true;
    });
    return () => BackHandler.removeEventListener('hardwareBackPress');
  }, [navigation, monthlyCustomerStore]);

  const searchForCustomers = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      var monthlyCustomerResponse = await axios.get(
        `MonthlyCustomer/company/${authStore.companyId}/monthlyCustomer/${monthlyCustomerStore.placa}`,
      );
      if (monthlyCustomerResponse.data.length > 0) {
        showWarning('Cliente já é mensalista!');
        setLoading(false);
        return;
      }
      var customerResponse = await axios.get(
        `customer/${monthlyCustomerStore.placa}`,
      );

      if (customerResponse.data) {
        navigation.navigate('RelationCustomerMonthly', {
          customer: customerResponse.data,
        });
      } else {
        navigation.navigate('DetailsMensalista');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title>Placa do Veículo</Card.Title>
        <Input
          placeholder="Digite a placa do veículo"
          leftIcon={
            <Icon name="car" type="font-awesome" size={18} color="#4c4c4c" />
          }
          onChangeText={(text) => {
            monthlyCustomerStore.setPlaca(text);
          }}
          value={monthlyCustomerStore.placa}
          autoCapitalize="none"
          textContentType="name"
          errorMessage={
            monthlyCustomerStore.placa.length <= 0
              ? 'Placa do veículo é obrigatório'
              : ''
          }
        />
      </Card>
      <Button
        title="Próximo"
        type="outline"
        disabled={monthlyCustomerStore.placa <= 0}
        raised
        onPress={() => searchForCustomers()}
        containerStyle={styles.containerButton}
        titleStyle={styles.titleButton}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
    width: '80%',
  },
  titleButton: {
    color: 'white',
  },
  containerButton: {
    width: '50%',
  },
});

export default observer(AddMensalista);
