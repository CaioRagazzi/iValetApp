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

import {StoreContext} from '../../store/rootStore';
import {showWarning, showError} from '../../components/toast';
import {validateEmail} from '../../utils/utilsFunctions';
import {InputEmail} from '../../components/inputEmail';
import {InputPassword} from '../../components/inputPassword';
import OverlayCompanies from '../../components/overlayCompanies/index';
import BaseLayout from './baseLayout';
import axios from '../../services/axios';
import {observer} from 'mobx-react-lite';

const LoginScreen = ({navigation}) => {
  const {authStore} = useContext(StoreContext);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputEmailErrorMessage, setInputEmailErrorMessage] = useState('');
  const [inputEmailErr, setInputEmailErr] = useState(false);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (authStore.error) {
      showWarning('Login e ou senha inválidos');
    }
  }, [authStore.error]);

  useEffect(() => {
    const handleLoginCompany = async (userId) => {
      await axios
        .get(`user/${userId}`)
        .then(async (res) => {
          if (res.data.companies.length > 1) {
            setCompanies(res.data.companies);
            setOverlayVisible(true);
          } else {
            const companyId = res.data.companies[0].id;
            authStore.setLoggedIn(1, companyId);
          }
        })
        .catch(() => {
          showError('Erro ao efetuar login!');
        });
    };
    if (authStore.authenticated) {
      const getToken = async () => {
        const token = await AsyncStorage.getItem('access_token');
        var decodedToken = jwt_decode(token);
        if (decodedToken.idPerfil === 1) {
          handleLoginCompany(decodedToken.id);
        } else {
          authStore.setLoggedIn(2);
        }
      };
      getToken();
    }
  }, [
    authStore.authenticated,
    navigation,
    authStore.type,
    authStore.logged,
    authStore,
  ]);

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
      authStore.logIn(username, password);
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
    navigation.navigate('SelectType');
  };

  const goToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
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
    authStore.setLoggedIn(1, value.id);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    authStore.logOut();
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
        loading={authStore.loading}
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
        companies={companies}
        onPress={handleSelectedCompany}
        onClose={() => closeOverlay()}
      />
    </BaseLayout>
  );
};

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

export default observer(LoginScreen);
