import React, {useContext, useState} from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from '../../../services/axios';
import {format} from 'date-fns';
import {StoreContext} from '../../../store/rootStore';
import {observer} from 'mobx-react-lite';

const ButtonAddNewInputDynamic = () => {
  const {priceStore, authStore} = useContext(StoreContext);
  const [loadingButtonAdd, setLoadingButtonAdd] = useState(false);

  const addNewInput = async () => {
    if (priceStore.isEdit) {
      setLoadingButtonAdd(true);
      await axios
        .post('price', {
          type: 2,
          to: null,
          from: null,
          weekDay: priceStore.quantityDynamic[0].weekDay,
          companyId: authStore.companyId,
          price: 0,
          uniqueIdPrice: priceStore.quantityDynamic[0].uniqueIdPrice,
          maxPriceValue: priceStore.quantityDynamic[0].maxPriceValue
            ? +priceStore.quantityDynamic[0].maxPriceValue
            : null,
        })
        .then((res) => {
          priceStore.setQuantityDynamic([
            ...priceStore.quantityDynamic,
            {
              id: res.data[0].id,
              uniqueIdPrice: priceStore.quantityDynamic[0].uniqueIdPrice,
              weekDay: priceStore.quantityDynamic[0].weekDay,
              start: '',
              end: '',
              price: '',
            },
          ]);
          setLoadingButtonAdd(false);
        })
        .catch(() => {
          setLoadingButtonAdd(false);
        });
    } else {
      priceStore.setQuantityDynamic([
        ...priceStore.quantityDynamic,
        {
          id: format(new Date(), 'HHmmssSSS'),
          uniqueIdPrice: priceStore.quantityDynamic[0].uniqueIdPrice,
          weekDay: priceStore.quantityDynamic[0].weekDay,
          start: '',
          end: '',
          price: '',
        },
      ]);
    }
  };

  const button = () => {
    if (loadingButtonAdd) {
      return <ActivityIndicator size="small" color="#0000ff" />;
    } else if (priceStore.isDynamicEnabled) {
      return (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addNewInput()}>
          <Icon name="add-circle-outline" size={22} color="#41484F" />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return button();
};

const styles = StyleSheet.create({
  addButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
});

export default observer(ButtonAddNewInputDynamic);
