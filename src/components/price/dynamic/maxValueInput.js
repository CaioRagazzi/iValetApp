import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {StoreContext} from '../../../store/rootStore';
import {observer} from 'mobx-react-lite';

const MaxValueInput = () => {
  const {priceStore} = useContext(StoreContext);
  // const {hasMaxValue, maxValue, setMaxValue} = useContext(PriceContext);
  return priceStore.hasMaxValue ? (
    <Input
      labelStyle={styles.labelStyle}
      inputContainerStyle={styles.inputContainerMaxValue}
      leftIconContainerStyle={styles.inputIconContainerMaxValue}
      leftIcon={<Icon name="cash-outline" size={18} color="black" />}
      keyboardType="numeric"
      value={priceStore.maxValue}
      onChangeText={(text) => priceStore.setMaxValue(text)}
    />
  ) : null;
};

const styles = StyleSheet.create({
  inputContainerMaxValue: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    width: '50%',
  },
  inputIconContainerMaxValue: {
    paddingLeft: 10,
  },
  labelStyle: {
    marginBottom: 15,
  },
});

export default observer(MaxValueInput);
