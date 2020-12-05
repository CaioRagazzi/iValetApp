import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';

import {InputEmail} from '../../components/inputEmail';
import {InputPassword} from '../../components/inputPassword';
import BaseLayout from './baseLayout';
import axios from '../../services/axios';
import {showError, showSuccess} from '../../components/toast';

function CadastroLogin(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputEmailErr, setInputEmailErr] = useState(false);
  const [inputPasswordErr, setInputPasswordErr] = useState(false);
  const [inputConfirmPasswordErr, setInputConfirmPasswordErr] = useState(false);
  const [type, setType] = useState('');

  useEffect(() => {
    const typeParams = props.route.params.type;

    setType(typeParams);
  }, [props.route.params.type]);

  const checkEnabledButton = () => {
    if (
      inputEmailErr ||
      inputPasswordErr ||
      inputConfirmPasswordErr ||
      name.length <= 0 ||
      (company.length <= 0 && type === 'company')
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    const userToInsert = {
      name,
      password,
      email,
      perfil: 2,
    };

    const userCompanyToInsert = {
      name,
      password,
      email,
      perfil: 1,
      companyName: company,
    };

    try {
      if (type === 'company') {
        await axios.post('usercompany/createUserCompany', userCompanyToInsert);
      } else {
        await axios.post('/user', userToInsert);
      }
      showSuccess('Usuário criado com sucesso!');
      props.navigation.popToTop();
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
      if (error.response.data?.message.includes('Duplicate entry')) {
        showError('E-mail já existe!');
      } else {
        showError('Erro ao criar login!');
      }
    }
  };

  return (
    <BaseLayout title="iValet - Cadastro">
      <Input
        placeholder="Nome"
        leftIcon={<Icon name="person" size={24} color="black" />}
        onChangeText={(text) => setName(text)}
        value={name}
        autoCapitalize="words"
        textContentType="name"
        errorMessage={name.length <= 0 ? 'Nome é obrigatório' : ''}
      />
      <InputEmail
        required
        onChange={(text) => setEmail(text)}
        value={email}
        hasErrors={(err) => setInputEmailErr(err)}
      />
      {type === 'company' ? (
        <Input
          placeholder="Empresa"
          leftIcon={<Icon name="business" size={24} color="black" />}
          onChangeText={(text) => setCompany(text)}
          value={company}
          autoCapitalize="words"
          textContentType="name"
          errorMessage={
            company.length <= 0 ? 'Nome da empresa é obrigatório' : ''
          }
        />
      ) : null}
      <InputPassword
        onChange={(text) => setPassword(text)}
        required
        value={password}
        hasErrors={(err) => setInputPasswordErr(err)}
        showPasswordSize={true}
      />
      <InputPassword
        placeholder="Confirme a senha"
        onChange={(text) => setConfirmPassword(text)}
        required
        value={confirmPassword}
        hasErrors={(err) => setInputConfirmPasswordErr(err)}
        showPasswordSize={true}
      />
      <View style={styles.buttonsContainer}>
        <Button
          containerStyle={styles.button}
          title="Voltar"
          onPress={() => props.navigation.goBack()}
        />
        <Button
          containerStyle={styles.button}
          title="Cadastrar"
          onPress={() => handleRegister()}
          loading={loading}
          disabled={checkEnabledButton()}
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

export default CadastroLogin;
