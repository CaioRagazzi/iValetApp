import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Card, Input} from 'react-native-elements';
import OverlayLoading from '../../../components/overlayLoading';
import {Icon} from 'native-base';
import {HeaderBackButton} from '@react-navigation/stack';
import SaveIcon from '../../../components/saveIcon';
import axios from '../../../services/axios';
import {AuthContext} from '../../../contexts/auth';
import {showWarning} from '../../../components/toast';

export default function HandleMonthlyPrices({navigation, route}) {
  const {companyId} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [monthlyPrice, setMonthlyPrice] = useState({
    name: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    const {price, description, name} = monthlyPrice;

    if (route.params) {
      setEdit(true);
      setMonthlyPrice(route.params.price);
    }

    navigation.setOptions({
      title: `Tabela de Preço ${name}`,
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

    const save = async () => {
      if (price === '' || !price || price === '' || !price) {
        showWarning('Favor preencher todos os campos obrigatórios!');
        return;
      }

      setLoading(true);
      if (edit) {
        console.log('editando');
      } else {
        await axios
          .post('MonthlyPrices', {
            price: price,
            companyId: companyId,
            name: name,
            description: description,
          })
          .then((res) => {
            console.log(res.data);
            navigation.goBack();
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
      setLoading(false);
    };
  }, [navigation, route, edit, companyId, monthlyPrice]);

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
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    elevation: 5,
  },
});
