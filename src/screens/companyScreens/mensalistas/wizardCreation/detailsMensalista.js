import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Input, Button, Icon} from 'react-native-elements';
import {HeaderBackButton} from '@react-navigation/stack';
import {InputEmail} from '../../../../components/inputEmail';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../../../../store/rootStore';
import {ScrollView} from 'react-native-gesture-handler';

const RegisterMensalista = ({navigation}) => {
  const {monthlyCustomerStore} = useContext(StoreContext);
  const [inputEmailErr, setInputEmailErr] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: 'Dados Cadastrais',
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

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        style={styles.scrollViewStyle}
        keyboardShouldPersistTaps="handled">
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Dados Cadastrais</Card.Title>
          <Input
            placeholder="Nome"
            leftIcon={<Icon name="person" size={24} color="#4c4c4c" />}
            onChangeText={(text) => monthlyCustomerStore.setName(text)}
            value={monthlyCustomerStore.name}
            autoCapitalize="words"
            textContentType="name"
            errorMessage={
              monthlyCustomerStore.name.length <= 0 ? 'Nome é obrigatório' : ''
            }
          />
          <InputEmail
            onChange={(text) => monthlyCustomerStore.setEmail(text)}
            value={monthlyCustomerStore.email}
            hasErrors={(err) => setInputEmailErr(err)}
          />
          <Input
            placeholder="Telefone"
            leftIcon={<Icon name="phone" size={24} color="#4c4c4c" />}
            onChangeText={(text) => monthlyCustomerStore.setPhone(text)}
            value={monthlyCustomerStore.phone}
            textContentType="telephoneNumber"
          />
          <Input
            placeholder="Marca"
            leftIcon={
              <Icon name="car" type="font-awesome" size={18} color="#4c4c4c" />
            }
            onChangeText={(text) => monthlyCustomerStore.setBrand(text)}
            value={monthlyCustomerStore.brand}
          />
          <Input
            placeholder="Modelo"
            leftIcon={
              <Icon name="car" type="font-awesome" size={18} color="#4c4c4c" />
            }
            onChangeText={(text) => monthlyCustomerStore.setModel(text)}
            value={monthlyCustomerStore.model}
          />
        </Card>
        <View style={styles.mainContainerButtons}>
          <Button
            title="Voltar"
            type="outline"
            raised
            onPress={() => navigation.goBack()}
            containerStyle={styles.containerButton}
            titleStyle={styles.titleButton}
          />
          <Button
            title="Próximo"
            type="outline"
            raised
            disabled={monthlyCustomerStore.name.length <= 0}
            onPress={() => navigation.navigate('SelectPrice')}
            containerStyle={[styles.containerButton, {marginLeft: 12}]}
            titleStyle={styles.titleButton}
          />
        </View>
      </ScrollView>
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
    width: '45%',
  },
  mainContainerButtons: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    alignItems: 'center',
    paddingBottom: 18,
  },
  scrollViewStyle: {
    width: '100%',
  },
});

export default observer(RegisterMensalista);
