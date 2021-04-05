import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import {Card, Button} from 'react-native-elements';
import {StoreContext} from '../../../../store/rootStore';
import axios from '../../../../services/axios';
import OverlayLoading from '../../../../components/overlayLoading';

const SummaryCustomerMonthlyScreen = ({navigation}) => {
  const {monthlyCustomerStore, authStore} = useContext(StoreContext);
  const [loadingPage, setLoadingPage] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      title: 'Resumo',
      headerLeft: () => (
        <HeaderBackButton
          tintColor="#ffffff"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation, monthlyCustomerStore]);

  const handleConfirm = () => {
    setLoadingPage(true);
    axios
      .post('MonthlyCustomer/Anonymous', {
        placa: monthlyCustomerStore.placa,
        name: monthlyCustomerStore.name,
        email: monthlyCustomerStore.email,
        telefone: monthlyCustomerStore.phone,
        marca: monthlyCustomerStore.brand,
        modelo: monthlyCustomerStore.model,
        companyId: authStore.companyId,
        priceId: monthlyCustomerStore.price.id,
      })
      .then(() => {
        navigation.popToTop();
        setLoadingPage(false);
        monthlyCustomerStore.resetFields;
      })
      .catch((err) => {});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.titleTexts}>Placa</Card.Title>
        <Text style={styles.texts}>
          {monthlyCustomerStore.placa.toUpperCase()}
        </Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.titleTexts}>Nome</Card.Title>
        <Text style={styles.texts}>
          {monthlyCustomerStore.name.toUpperCase()}
        </Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.titleTexts}>Email</Card.Title>
        <Text style={styles.texts}>
          {monthlyCustomerStore.email.toUpperCase()}
        </Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.titleTexts}>Telefone</Card.Title>
        <Text style={styles.texts}>
          {monthlyCustomerStore.phone.toUpperCase()}
        </Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.titleTexts}>Marca</Card.Title>
        <Text style={styles.texts}>
          {monthlyCustomerStore.brand.toUpperCase()}
        </Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.titleTexts}>Modelo</Card.Title>
        <Text style={styles.texts}>
          {monthlyCustomerStore.model.toUpperCase()}
        </Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.titleTexts}>Tabela</Card.Title>
        <Text style={styles.texts}>
          {monthlyCustomerStore.price.name.toUpperCase()}
        </Text>
      </Card>
      <View style={styles.mainContainerButtons}>
        <Button
          title="Voltar"
          type="outline"
          raised
          onPress={() => navigation.goBack()}
          containerStyle={styles.containerButton}
          titleStyle={styles.titleButton}
        />
        <Button
          title="Confirmar"
          type="outline"
          raised
          disabled={monthlyCustomerStore.name.length <= 0}
          onPress={() => handleConfirm()}
          containerStyle={[styles.containerButton, {marginLeft: 12}]}
          titleStyle={styles.titleButton}
        />
      </View>
      <OverlayLoading isLoading={loadingPage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  texts: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  titleTexts: {
    fontSize: 15,
    alignSelf: 'flex-start',
  },
  cardContainer: {
    borderRadius: 10,
    margin: 6,
    elevation: 5,
  },
  containerButton: {
    width: '45%',
  },
  mainContainerButtons: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    marginTop: 26,
  },
  titleButton: {
    color: 'white',
  },
});

export default SummaryCustomerMonthlyScreen;
