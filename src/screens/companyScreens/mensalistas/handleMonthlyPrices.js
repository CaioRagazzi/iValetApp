import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Card, Input} from 'react-native-elements';
import OverlayLoading from '../../../components/overlayLoading';
import {Icon} from 'native-base';
import {HeaderBackButton} from '@react-navigation/stack';
import SaveIcon from '../../../components/saveIcon';
import {StoreContext} from '../../../store/rootStore';
import {showWarning} from '../../../components/toast';
import {observer} from 'mobx-react-lite';

const HandleMonthlyPrices = ({navigation, route}) => {
  const {monthlyStore} = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [monthlyPrice, setMonthlyPrice] = useState({
    id: 0,
    name: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    if (route.params) {
      setEdit(true);
      setMonthlyPrice(route.params.price);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: `Tabela de Preço ${monthlyPrice.name}`,
      headerLeft: () => (
        <HeaderBackButton
          tintColor="#ffffff"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <SaveIcon onPress={() => save()} />,
    });
  }, [monthlyPrice]);

  const save = async () => {
    if (
      monthlyPrice.price === '' ||
      !monthlyPrice.price ||
      monthlyPrice.price === '' ||
      !monthlyPrice.price
    ) {
      showWarning('Favor preencher todos os campos obrigatórios!');
      return;
    }

    setLoading(true);
    if (edit) {
      await monthlyStore.editMonthlyPrice(monthlyPrice).then((res) => {
        navigation.goBack();
      });
    } else {
      await monthlyStore.createMonthlyPrice(monthlyPrice).then((res) => {
        navigation.goBack();
      });
    }
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Nome*</Card.Title>
          <Input
            value={monthlyPrice.name}
            placeholder="Digite o nome da tabela"
            leftIcon={
              <Icon
                type="MaterialIcons"
                name="backup-table"
                size={24}
                color="black"
              />
            }
            onChangeText={(value) =>
              setMonthlyPrice({...monthlyPrice, name: value})
            }
          />
        </Card>

        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Valor*</Card.Title>
          <Input
            value={monthlyPrice.price}
            placeholder="Digite o valor da tabela"
            leftIcon={
              <Icon
                type="MaterialIcons"
                name="backup-table"
                size={24}
                color="black"
              />
            }
            onChangeText={(value) =>
              setMonthlyPrice({...monthlyPrice, price: value})
            }
          />
        </Card>

        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Descrição</Card.Title>
          <Input
            value={monthlyPrice.description}
            placeholder="Digite a descrição da tabela"
            leftIcon={
              <Icon
                type="MaterialIcons"
                name="backup-table"
                size={24}
                color="black"
              />
            }
            onChangeText={(value) =>
              setMonthlyPrice({...monthlyPrice, description: value})
            }
          />
        </Card>
      </ScrollView>
      <OverlayLoading isLoading={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    elevation: 5,
  },
});

export default observer(HandleMonthlyPrices);
