import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';
import {HeaderBackButton} from '@react-navigation/stack';

export default function AddMensalista({navigation}) {
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

  return (
    <View style={styles.mainContainer}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title>Placa do Veículo</Card.Title>
        <Input placeholder="Digite a placa do veículo" />
      </Card>
      <Button
        title="Próximo"
        type="outline"
        raised
        onPress={() => navigation.navigate('RegisterMensalista')}
        containerStyle={styles.containerButton}
        titleStyle={styles.titleButton}
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
