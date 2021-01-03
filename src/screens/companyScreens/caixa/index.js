import React, {useEffect, useContext, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import OpenDrawerIcon from '../../../components/openDrawerIcon';
import {Card} from 'react-native-elements';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {StoreContext} from '../../../store/rootStore';
import Orientation from 'react-native-orientation';
import axios from '../../../services/axios';
import {observer} from 'mobx-react-lite';

const CaixaScreen = ({navigation}) => {
  const {authStore, caixaStore} = useContext(StoreContext);

  const [orientation, setOrientation] = useState(
    Orientation.getInitialOrientation(),
  );

  useEffect(() => {
    navigation.setOptions({
      title: 'Caixa',
      headerLeft: () => (
        <OpenDrawerIcon onPress={() => navigation.toggleDrawer()} />
      ),
    });

    Orientation.getOrientation((_, ori) => {
      setOrientation(ori);
    });

    Orientation.addOrientationListener(setOrientation);

    return () => {
      Orientation.removeOrientationListener(setOrientation);
    };
  }, [navigation]);

  const getTitleCaixa = () => {
    if (caixaStore.loading) {
      return <ActivityIndicator color="#ffffff" />;
    } else if (caixaStore.isCaixaOpened) {
      return <Text style={styles.text}>Fechar Caixa</Text>;
    } else {
      return <Text style={styles.text}>Abrir Caixa</Text>;
    }
  };

  const getIconCaixa = () => {
    if (caixaStore.loading) {
      return (
        <ActivityIndicator
          color="#ffffff"
          size={orientation === 'PORTRAIT' ? 'small' : 'large'}
        />
      );
    } else if (caixaStore.isCaixaOpened) {
      return (
        <IconFontisto
          name="dropbox"
          size={orientation === 'PORTRAIT' ? 60 : 90}
          color="#ffffff"
        />
      );
    } else {
      return (
        <IconIonicons
          name="cube-outline"
          size={orientation === 'PORTRAIT' ? 60 : 90}
          color="#ffffff"
        />
      );
    }
  };

  const checkIfTheresCarInAndOpenCloseCaixa = async () => {
    if (caixaStore.isCaixaOpened) {
      caixaStore.setLoading(true);
      axios.get(`transaction/opened/${authStore.companyId}`).then((res) => {
        console.log(res.data);
        if (res.data.length === 0) {
          caixaStore.openCloseCaixa();
        } else {
          Alert.alert(
            'Atenção',
            'Ainda existem carros estacionados, tem certeza que deseja fechar o caixa?',
            [
              {
                text: 'Cancelar',
                onPress: () => {
                  caixaStore.setLoading(false);
                },
                style: 'cancel',
              },
              {text: 'Sim', onPress: () => caixaStore.openCloseCaixa()},
            ],
            {cancelable: false},
          );
        }
      });
    } else {
      caixaStore.openCloseCaixa();
    }
  };

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Card
          containerStyle={
            orientation === 'PORTRAIT' ? styles.card : styles.cardLandscape
          }
          wrapperStyle={{flex: 1}}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => checkIfTheresCarInAndOpenCloseCaixa()}>
            <View style={styles.cardTitle}>{getTitleCaixa()}</View>
            <View style={styles.iconContainer}>{getIconCaixa()}</View>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '35%',
    height: '25%',
    borderRadius: 10,
    padding: 0,
    backgroundColor: '#7c42bd',
    elevation: 5,
  },
  cardLandscape: {
    width: '35%',
    height: '60%',
    borderRadius: 10,
    padding: 0,
    backgroundColor: '#7c42bd',
    elevation: 5,
  },
  cardTitle: {
    justifyContent: 'center',
    backgroundColor: '#12005e',
    height: 40,
    padding: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tinyLogo: {
    alignSelf: 'center',
    height: 80,
    width: 80,
    opacity: 0.7,
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default observer(CaixaScreen);
