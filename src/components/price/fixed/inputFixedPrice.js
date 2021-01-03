import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {PriceContext} from '../../../contexts/price';
import Icon from 'react-native-vector-icons/Ionicons';
import {StoreContext} from '../../../store/rootStore';
import {observer} from 'mobx-react-lite';

const InputFixedPrice = () => {
  const {priceStore} = useContext(StoreContext);
  // const {fixedValue, setfixedValue, isFixedEnabled} = useContext(PriceContext);

  return priceStore.isFixedEnabled ? (
    <View style={styles.inputMainContainerFixed}>
      <Input
        label="Valor"
        inputContainerStyle={styles.inputContainerFixed}
        leftIconContainerStyle={styles.inputIconContainerFixed}
        leftIcon={<Icon name="cash-outline" size={24} color="black" />}
        value={priceStore.fixedValue}
        keyboardType="number-pad"
        onChangeText={(text) => priceStore.setFixedValue(text)}
      />
    </View>
  ) : null;
};

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

export default observer(InputFixedPrice);
