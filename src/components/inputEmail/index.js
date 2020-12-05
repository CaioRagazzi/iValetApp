import React, {useState, useEffect} from 'react';
import {Input, Icon} from 'react-native-elements';
import {validateEmail} from '../../utils/utilsFunctions';

export const InputEmail = (props) => {
  const [email, setEmail] = useState('');
  const [inputEmailErrorMessage, setInputEmailErrorMessage] = useState('');

  useEffect(() => {
    const sendError = (status) => {
      if (props.hasErrors) {
        props.hasErrors(status);
      }
    };

    if (props.required) {
      if (email.length <= 0) {
        setInputEmailErrorMessage('Email é obrigatório');
        sendError(true);
        return;
      } else {
        setInputEmailErrorMessage('');
        sendError(false);
      }
    }

    if (!validateEmail(email) && email !== '') {
      setInputEmailErrorMessage('Email inválido');
      sendError(true);
    } else {
      setInputEmailErrorMessage('');
      sendError(false);
    }
  }, [email, props.required, props.hasErros, props]);

  const handleEmailChange = (text) => {
    setEmail(text);
    props.onChange(text);
  };

  return (
    <Input
      placeholder={!props.placeholder ? 'Email' : props.placeholder}
      leftIcon={<Icon name="email" size={24} />}
      onChangeText={handleEmailChange}
      value={props.value}
      autoCapitalize="none"
      textContentType="emailAddress"
      keyboardType="email-address"
      errorMessage={inputEmailErrorMessage}
    />
  );
};
