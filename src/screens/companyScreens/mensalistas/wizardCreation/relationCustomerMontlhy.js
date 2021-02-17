import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Input, Button, Icon, Text} from 'react-native-elements';
import {HeaderBackButton} from '@react-navigation/stack';

const RelationCustomerMontlhyScreen = ({route, navigation}) => {
  const [customer, setCustomer] = useState(undefined);
  useEffect(() => {
    setCustomer(route.params.customer);
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
  }, [navigation, route]);

  const handleYes = () => {
    console.log('yes');
  };

  const handleNo = () => {
    navigation.navigate('DetailsMensalista');
  };

  return (
    <View style={styles.mainContainer}>
      <Text h4 style={styles.text}>
        Localizamos o seguinte cliente com a placa informada:{' '}
      </Text>
      {customer !== undefined ? (
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Cliente</Card.Title>
          <Input
            leftIcon={<Icon name="person" size={24} color="#4c4c4c" />}
            disabled
            value={customer.name}
            autoCapitalize="words"
          />
          <Input
            leftIcon={
              <Icon name="car" type="font-awesome" size={18} color="#4c4c4c" />
            }
            disabled
            value={customer.placa}
            autoCapitalize="words"
          />
        </Card>
      ) : null}
      <Text h4 style={styles.text}>
        Deseja utilizá-lo?
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Sim"
          type="outline"
          disabled={customer === undefined}
          raised
          onPress={() => handleYes()}
          containerStyle={styles.containerButton}
          titleStyle={styles.titleButton}
          loading={customer === undefined}
        />
        <Button
          title="Não"
          type="outline"
          disabled={customer === undefined}
          raised
          onPress={() => handleNo()}
          containerStyle={styles.containerButton}
          titleStyle={styles.titleButton}
          loading={customer === undefined}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 18,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
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
    width: '40%',
    margin: 10,
  },
});

export default RelationCustomerMontlhyScreen;
