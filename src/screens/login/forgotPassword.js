import React, {useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {Button} from 'react-native-elements';
import {InputEmail} from '../../components/inputEmail';
import BaseLayout from './baseLayout';
import axios from '../../services/axios';
import {showError, showWarning} from '../../components/toast';

export default function ForgotPassword(props) {
  const [email, setEmail] = useState('');
  const [inputEmailErr, setInputEmailErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const forgotPassword = () => {
    setLoading(true);
    Keyboard.dismiss();
    axios
      .post('/user/SendEmailForgotPassword', {
        to: email,
      })
      .then(() => {
        showWarning('E-mail de recuperação enviado!');
        props.navigation.goBack();
        setLoading(false);
      })
      .catch(() => {
        showError('Erro ao recuperar e-mail!');
        setLoading(false);
      });
  };

  return (
    <BaseLayout title="iValet - Recuperar Senha">
      <InputEmail
        required
        onChange={(text) => setEmail(text)}
        value={email}
        hasErrors={(err) => setInputEmailErr(err)}
      />
      <View style={styles.buttonsContainer}>
        <Button
          containerStyle={styles.button}
          title="Voltar"
          onPress={() => props.navigation.goBack()}
        />
        <Button
          containerStyle={styles.button}
          title="Recuperar"
          onPress={() => forgotPassword()}
          loading={loading}
          disabled={inputEmailErr}
        />
      </View>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignSelf: 'center',
    width: '30%',
  },
});
