import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from './src/navigator/index';
import AuthProvider from './src/contexts/auth';
import {ThemeProvider} from 'react-native-elements';
import {Root} from 'native-base';

const App = () => {
  const theme = {
    Button: {
      raised: true,
      titleStyle: {},
      buttonStyle: {
        backgroundColor: '#4a148c',
      },
    },
    Icon: {
      color: '#41484F',
    },
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Root>
          <StatusBar backgroundColor="#38006b" />
          <Navigator />
        </Root>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
