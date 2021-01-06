import React, {useState, useEffect} from 'react';
import {Input, Icon} from 'react-native-elements';

export const InputPassword = (props) => {
  const [password, setPassword] = useState('');
  const [inputPasswordErrorMessage, setInputPasswordErrorMessage] = useState(
    '',
  );

  useEffect(() => {
    const sendError = (status) => {
      if (props.hasErrors) {
        props.hasErrors(status);
      }
    };

    if (props.required) {
      if (password.length <= 0) {
        setInputPasswordErrorMessage(
          !props.placeholder
            ? 'Senha é obrigatório'
            : `${props.placeholder} é obrigatório`,
        );
        sendError(true);
        return;
      } else {
        setInputPasswordErrorMessage('');
        sendError(false);
      }
    }

    if (props.showPasswordSize) {
      if (password.length < 6 && password !== '') {
        setInputPasswordErrorMessage(
          !props.placeholder
            ? 'Senha deve ter no mínimo 6 caracteres'
            : `${props.placeholder} deve ter no mínimo 6 caracteres`,
        );
        sendError(true);
      } else {
        setInputPasswordErrorMessage('');
        sendError(false);
      }
    }
  }, [password, props.required, props.placeholder, props]);

  const handlePasswordChange = (text) => {
    setPassword(text);
    props.onChange(text);
  };

  return (
    <Input
      placeholder={!props.placeholder ? 'Senha' : props.placeholder}
      leftIcon={<Icon name="lock" size={24} color="#4c4c4c"/>}
      onChangeText={handlePasswordChange}
      value={password}
      autoCapitalize="none"
      secureTextEntry
      errorMessage={inputPasswordErrorMessage}
    />
  );
};
