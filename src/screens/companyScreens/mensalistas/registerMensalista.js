import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';
import {HeaderBackButton} from '@react-navigation/stack';

export default function RegisterMensalista({navigation}) {
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
        <Input placeholder="Nome Completo" />
        <Input placeholder="E-mail" />
        <Input placeholder="Telefone" />
        <Input placeholder="Marca" />
        <Input placeholder="Modelo" />
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
