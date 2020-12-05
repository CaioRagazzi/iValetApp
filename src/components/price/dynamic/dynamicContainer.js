import React, {useContext} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {PriceContext} from '../../../contexts/price';
import CheckBox from '@react-native-community/checkbox';
import InputTimeDynamic from './inputTimeDynamic';
import ButtonAddNewInputDynamic from './buttonAddNewInputDynamic';
import MaxValueInput from './maxValueInput';

export default function DynamicContainer() {
  const {
    isDynamicEnabled,
    hasMaxValue,
    setHasMaxValue,
    handleSwitches,
    isEdit,
  } = useContext(PriceContext);

  const dynamicContainer = () => {
    return (
      <View>
        <View style={styles.containerTexts}>
          <Text style={styles.text}>Valor Dinâmico: </Text>
          {!isEdit ? (
            <Switch
              trackColor={{false: '#767577', true: '#12005e'}}
              thumbColor={isDynamicEnabled ? '#7c43bd' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => handleSwitches('dynamic')}
              value={isDynamicEnabled}
            />
          ) : null}
        </View>
        {isDynamicEnabled ? (
          <View>
            <View style={styles.containerMaxValue}>
              <CheckBox
                disabled={false}
                value={hasMaxValue}
                onValueChange={(inp) => setHasMaxValue(inp)}
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
}

const styles = StyleSheet.create({
  containerMaxValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
