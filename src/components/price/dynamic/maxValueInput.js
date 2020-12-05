import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {PriceContext} from '../../../contexts/price';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MaxValueInput() {
  const {hasMaxValue, maxValue, setMaxValue} = useContext(PriceContext);
  return hasMaxValue ? (
    <Input
      labelStyle={styles.labelStyle}
      inputContainerStyle={styles.inputContainerMaxValue}
      leftIconContainerStyle={styles.inputIconContainerMaxValue}
      leftIcon={<Icon name="cash-outline" size={18} color="black" />}
      keyboardType="numeric"
      value={maxValue}
      onChangeText={(text) => setMaxValue(text)}
    />
  ) : null;
}

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
