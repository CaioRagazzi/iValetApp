import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {PriceContext} from '../../../contexts/price';
import Icon from 'react-native-vector-icons/Ionicons';

export default function InputFixedPrice() {
  const {fixedValue, setfixedValue, isFixedEnabled} = useContext(PriceContext);

  return isFixedEnabled ? (
    <View style={styles.inputMainContainerFixed}>
      <Input
        label="Valor"
        inputContainerStyle={styles.inputContainerFixed}
        leftIconContainerStyle={styles.inputIconContainerFixed}
        leftIcon={<Icon name="cash-outline" size={24} color="black" />}
        value={fixedValue}
        keyboardType="number-pad"
        onChangeText={(text) => setfixedValue(text)}
      />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  inputContainerFixed: {
    borderWidth: 1,
    borderRadius: 5,
  },
  inputMainContainerFixed: {
    marginTop: 10,
  },
  inputIconContainerFixed: {
    paddingLeft: 10,
  },
});
