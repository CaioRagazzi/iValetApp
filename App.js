import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from './src/navigator/index';
import AuthProvider from './src/contexts/auth';
import {StoreContext, rootStore} from './src/store/rootStore';
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
    <StoreContext.Provider value={rootStore}>
      <ThemeProvider theme={theme}>
        <Root>
          <StatusBar backgroundColor="#38006b" />
          <Navigator />
        </Root>
      </ThemeProvider>
    </StoreContext.Provider>
  );
};

export default App;
