import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Input, Button, Icon} from 'react-native-elements';
import {HeaderBackButton} from '@react-navigation/stack';
import {InputEmail} from '../../../components/inputEmail';

export default function RegisterMensalista({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inputEmailErr, setInputEmailErr] = useState('');
  const [phone, setPhone] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
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
    <View style={styles.mainContainer}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title>Dados Cadastrais</Card.Title>
        <Input
          placeholder="Nome"
          leftIcon={<Icon name="person" size={24} color="#4c4c4c" />}
          onChangeText={(text) => setName(text)}
          value={name}
          autoCapitalize="words"
          textContentType="name"
          errorMessage={name.length <= 0 ? 'Nome é obrigatório' : ''}
        />
        <InputEmail
          onChange={(text) => setEmail(text)}
          value={email}
          hasErrors={(err) => setInputEmailErr(err)}
        />
        <Input
          placeholder="Telefone"
          leftIcon={<Icon name="phone" size={24} color="#4c4c4c" />}
          onChangeText={(text) => setPhone(text)}
          value={phone}
          textContentType="telephoneNumber"
        />
        <Input
          placeholder="Marca"
          leftIcon={
            <Icon name="car" type="font-awesome" size={18} color="#4c4c4c" />
          }
          onChangeText={(text) => setBrand(text)}
          value={brand}
        />
        <Input
          placeholder="Modelo"
          leftIcon={
            <Icon name="car" type="font-awesome" size={18} color="#4c4c4c" />
          }
          onChangeText={(text) => setModel(text)}
          value={model}
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
          disabled={name.length <= 0}
          onPress={() => navigation.navigate('RegisterMensalista')}
          containerStyle={[styles.containerButton, {marginLeft: 12}]}
          titleStyle={styles.titleButton}
        />
      </View>
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
    width: '45%',
  },
  mainContainerButtons: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
  },
});
