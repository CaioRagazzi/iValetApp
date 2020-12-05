import {Toast} from 'native-base';

export const showWarning = (message) => {
  Toast.show({
    text: message,
    buttonText: 'Ok',
    type: 'warning',
    duration: 3000,
  });
};

export const showError = (message) => {
  Toast.show({
    text: message,
    buttonText: 'Ok',
    type: 'danger',
    duration: 3000,
  });
};

export const showInformation = (message) => {
  Toast.show({
    text: message,
    buttonText: 'Ok',
    type: 'success',
    duration: 3000,
  });
};

export const showSuccess = (message) => {
  Toast.show({
    text: message,
    buttonText: 'Ok',
    type: 'success',
    style: {backgroundColor: '#007f00'},
    duration: 3000,
  });
};
