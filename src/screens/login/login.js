import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from 'jwt-decode';

import {AuthContext} from '../../contexts/auth';
import {showWarning} from '../../components/toast';
import {validateEmail} from '../../utils/utilsFunctions';
import {InputEmail} from '../../components/inputEmail';
import {InputPassword} from '../../components/inputPassword';
import OverlayCompanies from '../../components/overlayCompanies/index';
import BaseLayout from './baseLayout';
import axios from '../../services/axios';

function LoginScreen(props) {
  const {
    error,
    logIn,
    loading,
    authenticated,
    setLogged,
    setType,
    setCompanyId,
    logOut,
  } = useContext(AuthContext);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputEmailErrorMessage, setInputEmailErrorMessage] = useState('');
  const [inputEmailErr, setInputEmailErr] = useState(false);

  useEffect(() => {
    if (error) {
      showWarning('Login e ou senha inválidos');
    }
  }, [error]);

  useEffect(() => {
    const handleLoginCompany = async (userId) => {
      await axios.get(`user/${userId}`).then(async (res) => {
        if (res.data.companies.length > 1) {
          setOverlayVisible(true);
        } else {
          setType(1);
          setLogged(true);
          setCompanyId(res.data.companies[0].id);
        }
      });
    };
    if (authenticated) {
      const getToken = async () => {
        const token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        if (decodedToken.idPerfil === 1) {
          handleLoginCompany(decodedToken.id);
        } else {
          setType(2);
          setLogged(true);
        }
      };
      getToken();
    }
  }, [authenticated, props.navigation, setType, setLogged, setCompanyId]);

  useEffect(() => {
    if (!validateEmail(username) && username !== '') {
      setInputEmailErrorMessage('Email inválido');
    } else {
      setInputEmailErrorMessage('');
    }
  }, [username]);

  const handleLogin = () => {
    const isOk = verifyFields();

    if (isOk) {
      Keyboard.dismiss();
      logIn(username, password);
    }
  };

  const verifyFields = () => {
    if (username === '' || password === '') {
      showWarning('Favor preencher todos os campos obrigatórios');
      return false;
    }
    return true;
  };

  const goToCadastro = () => {
    props.navigation.navigate('SelectType');
  };

  const goToForgotPassword = () => {
    props.navigation.navigate('ForgotPassword');
  };

  const checkEnabledButton = () => {
    if (
      username === '' ||
      password === '' ||
      inputEmailErrorMessage.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSelectedCompany = async (value) => {
    setOverlayVisible(false);
    setType(1);
    setLogged(true);
    setCompanyId(value.id);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    logOut();
  };

  return (
    <BaseLayout title="iValet">
      <InputEmail
        onChange={(text) => setUsername(text)}
        value={username}
        hasErrors={(err) => setInputEmailErr(err)}
      />
      <InputPassword
        onChange={(text) => setPassword(text)}
        value={password}
        showPasswordSize={false}
      />
      <Button
        containerStyle={styles.button}
        title="Login"
        onPress={() => handleLogin()}
        loading={loading}
        disabled={checkEnabledButton()}
        raised
      />
      <View style={styles.infoContainer}>
        <TouchableWithoutFeedback onPress={() => goToForgotPassword()}>
          <Text style={styles.txtForgotPassword}>Esqueci a senha</Text>
        </TouchableWithoutFeedback>
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.txtLogin}>Não possui login?</Text>
          <TouchableWithoutFeedback onPress={() => goToCadastro()}>
            <Text style={styles.txtUnderline}>Cadastre-se</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <OverlayCompanies
        visible={overlayVisible}
        onPress={handleSelectedCompany}
        onClose={() => closeOverlay()}
      />
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  forgotPasswordContainer: {
    paddingTop: 16,
    flexDirection: 'row',
  },
  infoContainer: {
    alignItems: 'center',
  },
  txtForgotPassword: {
    textDecorationLine: 'underline',
    paddingTop: 10,
    fontSize: 16,
  },
  txtUnderline: {
    textDecorationLine: 'underline',
    paddingLeft: 2,
    fontSize: 16,
  },
  txtLogin: {
    fontSize: 16,
  },
  button: {
    alignSelf: 'center',
    width: '50%',
  },
});

export default LoginScreen;
