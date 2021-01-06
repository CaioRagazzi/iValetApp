import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Input, Button, Icon} from 'react-native-elements';
import {HeaderBackButton} from '@react-navigation/stack';
import axios from '../../../services/axios';

export default function AddMensalista({navigation}) {
  const [plate, setPlate] = useState('');
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
  }, [navigation]);

  const searchForCustomers = () => {
    setLoading(true);
    axios
      .get(`customer/${plate}`)
      .then((res) => {
        if (res.data) {
          navigation.navigate('RelationCustomerMonthly', {customer: res.data});
        } else {
          navigation.navigate('DetailsMensalista');
        }
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
          onChangeText={(text) => setPlate(text)}
          value={plate}
          autoCapitalize="none"
          textContentType="name"
          errorMessage={
            plate.length <= 0 ? 'Placa do veículo é obrigatório' : ''
          }
        />
      </Card>
      <Button
        title="Próximo"
        type="outline"
        disabled={plate.length <= 0}
        raised
        onPress={() => searchForCustomers()}
        containerStyle={styles.containerButton}
        titleStyle={styles.titleButton}
        loading={loading}
      />
    </View>
  );
}

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
