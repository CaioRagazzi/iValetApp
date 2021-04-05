import React, {useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import FloatingActionButton from '../../../components/floatingActionButton';
import {StoreContext} from '../../../store/rootStore';
import OpenDrawerIcon from '../../../components/openDrawerIcon';
import {stylesDefault} from '../../../styles/defaultStyles';
import {showWarning} from '../../../components/toast';
import {observer} from 'mobx-react-lite';

const HomeScreen = ({navigation}) => {
  const {caixaStore, gatewayStore} = useContext(StoreContext);

  useEffect(() => {
    gatewayStore.init();
  }, [gatewayStore]);

  useEffect(() => {
    caixaStore.getOpenedCaixa();
  }, [caixaStore]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Início',
      headerLeft: () => (
        <OpenDrawerIcon onPress={() => navigation.toggleDrawer()} />
      ),
    });
  }, [navigation]);

  const handleCarEnty = () => {
    if (caixaStore.isCaixaOpened) {
      navigation.navigate('FormEntryCar');
    } else {
      showWarning('O caixa esta fechado!');
    }
  };

  return (
    <View style={[styles.mainContainer, stylesDefault.mainContainer]}>
      {/* <TextH h2> Caixa {isCaixaOpened ? 'Aberto' : 'Fechado'} </TextH> */}
      {/* <View style={styles.resumeContainer}>
        <View style={styles.containerRow}>
          <Text>Total 1</Text>
          <Text>12</Text>
        </View>
        <View style={styles.containerRow}>
          <Text>Total 2</Text>
          <Text>23</Text>
        </View>
        <View style={styles.containerRow}>
          <Text>Total 3</Text>
          <Text>30</Text>
        </View>
        <View style={styles.containerRow}>
          <Text>Total 4</Text>
          <Text>10</Text>
        </View>
        <View style={styles.containerRow}>
          <Text>Total 5</Text>
          <Text>50</Text>
        </View>
      </View> */}
      {/* <Button
        title={isCaixaOpened ? 'Fechar Caixa' : 'Abrir Caixa'}
        onPress={() => openCloseCaixa()}
      /> */}
      <FloatingActionButton
        isLoading={caixaStore.loading}
        text="Entrada"
        onPress={() => handleCarEnty()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resumeContainer: {
    width: '50%',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
  },
});

export default observer(HomeScreen);
