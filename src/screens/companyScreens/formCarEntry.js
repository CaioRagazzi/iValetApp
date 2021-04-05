import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Keyboard} from 'react-native';
import {Input, Card} from 'react-native-elements';
import axios from '../../services/axios';
import {StoreContext} from '../../store/rootStore';
import {Icon} from 'native-base';
import {showError} from '../../components/toast';
import SaveIcon from '../../components/saveIcon';
import {HeaderBackButton} from '@react-navigation/stack';
import OverlayLoading from '../../components/overlayLoading';
import {showWarning} from '../../components/toast';

export default function FormCarEntryScreen({navigation}) {
  // const {companyId} = useContext(AuthContext);
  const {authStore} = useContext(StoreContext);
  const [placa, setPlaca] = useState('');
  const [prisma, setPrisma] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const addCar = async () => {
      if (placa === '') {
        showWarning('Favor digitar a placa do veículo!');
        return;
      }

      Keyboard.dismiss();
      setLoading(true);
      await axios
        .post('transaction', {
          placa,
          companyId: authStore.companyId,
          prismaNumber: +prisma,
        })
        .then((res) => {
          navigation.popToTop();
          navigation.navigate('Entrada');
        })
        .catch((err) => {
          if (err.response.data.message === 'Cars already in') {
            showError('Carro já se encontra no estacionamento!');
          }
        });
      setLoading(false);
    };

    navigation.setOptions({
      title: 'Preço',
      headerRight: () => <SaveIcon onPress={() => addCar()} />,
      headerLeft: () => (
        <HeaderBackButton
          tintColor="#ffffff"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation, placa, prisma, authStore.companyId]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Card containerStyle={styles.cardDateContainer}>
          <Card.Title>Placa</Card.Title>
          <Input
            placeholder="Digite a placa do veículo"
            leftIcon={
              <Icon
                type="MaterialIcons"
                name="credit-card"
                size={24}
                color="black"
              />
            }
            onChangeText={(value) => setPlaca(value)}
          />
        </Card>
        <Card containerStyle={styles.cardPrismaContainer}>
          <Card.Title>Prisma</Card.Title>
          <Input
            leftIcon={
              <Icon
                type="MaterialIcons"
                name="bookmark-outline"
                size={24}
                color="black"
              />
            }
            onChangeText={(value) => setPrisma(value)}
          />
        </Card>
      </ScrollView>
      <OverlayLoading isLoading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardDateContainer: {
    borderRadius: 20,
    elevation: 5,
  },
  cardPrismaContainer: {
    width: '50%',
    borderRadius: 20,
    elevation: 5,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
