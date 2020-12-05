import React, {useContext, useState} from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {PriceContext} from '../../../contexts/price';
import {AuthContext} from '../../../contexts/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from '../../../services/axios';
import {format} from 'date-fns';

export default function ButtonAddNewInputDynamic() {
  const [loadingButtonAdd, setLoadingButtonAdd] = useState(false);
  const {
    isDynamicEnabled,
    setQuantityDynamic,
    quantityDynamic,
    isEdit,
  } = useContext(PriceContext);

  const {companyId} = useContext(AuthContext);

  const addNewInput = async () => {
    if (isEdit) {
      setLoadingButtonAdd(true);
      await axios
        .post('price', {
          type: 2,
          to: null,
          from: null,
          weekDay: quantityDynamic[0].weekDay,
          companyId,
          price: 0,
          uniqueIdPrice: quantityDynamic[0].uniqueIdPrice,
          maxPriceValue: quantityDynamic[0].maxPriceValue
            ? +quantityDynamic[0].maxPriceValue
            : null,
        })
        .then((res) => {
          setQuantityDynamic((previousState) => [
            ...previousState,
            {
              id: res.data[0].id,
              uniqueIdPrice: previousState[0].uniqueIdPrice,
              weekDay: previousState[0].weekDay,
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
      setQuantityDynamic((previousState) => [
        ...previousState,
        {
          id: format(new Date(), 'HHmmssSSS'),
          uniqueIdPrice: previousState[0].uniqueIdPrice,
          weekDay: previousState[0].weekDay,
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
    } else if (isDynamicEnabled) {
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
}

const styles = StyleSheet.create({
  addButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
});
