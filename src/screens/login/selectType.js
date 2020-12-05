import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseLayout from './baseLayout';

export default function SelectType(props) {
  const handleNavigateToCadastro = (type) => {
    props.navigation.navigate('CadastroLogin', {type});
  };

  return (
    <BaseLayout title="iValet - Tipo de Cadastro">
      <View style={styles.mainContainer}>
        <Button
          type="outline"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          icon={<Icon name="car" size={20} color="black" />}
          titleStyle={styles.titleButtonStyle}
          title="Cliente"
          onPress={() => handleNavigateToCadastro('client')}
        />
        <Button
          type="outline"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          icon={<Icon name="business-outline" size={20} color="black" />}
          titleStyle={styles.titleButtonStyle}
          title="Empresa"
          onPress={() => handleNavigateToCadastro('company')}
        />
      </View>
      <Button
        containerStyle={styles.button}
        title="Voltar"
        onPress={() => props.navigation.goBack()}
      />
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    width: '40%',
  },
  titleButtonStyle: {
    padding: 10,
    color: 'black',
  },
  button: {
    alignSelf: 'center',
    width: '30%',
    marginTop: 16,
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderColor: '#9E8170'
  },
});
