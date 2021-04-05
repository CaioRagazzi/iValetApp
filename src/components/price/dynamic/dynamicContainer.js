import React, {useContext} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import InputTimeDynamic from './inputTimeDynamic';
import ButtonAddNewInputDynamic from './buttonAddNewInputDynamic';
import MaxValueInput from './maxValueInput';
import {StoreContext} from '../../../store/rootStore';
import {observer} from 'mobx-react-lite';

const DynamicContainer = () => {
  const {priceStore} = useContext(StoreContext);
  // const {
  //   isDynamicEnabled,
  //   hasMaxValue,
  //   setHasMaxValue,
  //   handleSwitches,
  //   isEdit,
  // } = useContext(PriceContext);

  const dynamicContainer = () => {
    return (
      <View>
        <View style={styles.containerTexts}>
          <Text style={styles.text}>Valor Dinâmico: </Text>
          {!priceStore.isEdit ? (
            <Switch
              trackColor={{false: '#767577', true: '#12005e'}}
              thumbColor={priceStore.isDynamicEnabled ? '#7c43bd' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => priceStore.handleSwitches('dynamic')}
              value={priceStore.isDynamicEnabled}
            />
          ) : null}
        </View>
        {priceStore.isDynamicEnabled ? (
          <View>
            <View style={styles.containerMaxValue}>
              <CheckBox
                disabled={false}
                value={priceStore.hasMaxValue}
                onValueChange={(inp) => priceStore.setHasMaxValue(inp)}
              />
              <Text>Valor máximo</Text>
            </View>
            <View style={styles.subMainContainer}>
              <MaxValueInput />
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View>
      {dynamicContainer()}
      <InputTimeDynamic />
      <ButtonAddNewInputDynamic />
    </View>
  );
};

const styles = StyleSheet.create({
  containerMaxValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default observer(DynamicContainer);
