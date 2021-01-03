import React, {useContext} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import InputFixedPrice from './inputFixedPrice';
import {PriceContext} from '../../../contexts/price';
import {StoreContext} from '../../../store/rootStore';
import {observer} from 'mobx-react-lite';

const FixedContainer = () => {
  const {priceStore} = useContext(StoreContext);
  // const {isFixedEnabled, handleSwitches, isEdit} = useContext(PriceContext);

  return (
    <View>
      <View style={styles.containerTexts}>
        <Text style={styles.text}>Valor Fixo: </Text>
        {!priceStore.isEdit ? (
          <Switch
            trackColor={{false: '#767577', true: '#12005e'}}
            thumbColor={priceStore.isFixedEnabled ? '#7c43bd' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => priceStore.handleSwitches('fixed')}
            value={priceStore.isFixedEnabled}
          />
        ) : null}
      </View>
      <InputFixedPrice />
    </View>
  );
};

const styles = StyleSheet.create({
  containerTexts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default observer(FixedContainer);
