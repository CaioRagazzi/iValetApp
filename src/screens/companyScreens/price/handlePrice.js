import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {Divider} from 'react-native-elements';
import DateButtonsCalendar from '../../../components/dateButtonsCalendar';
import SaveIcon from '../../../components/saveIcon';
import {PriceContext} from '../../../contexts/price';
import {showWarning} from '../../../components/toast';
import {HeaderBackButton} from '@react-navigation/stack';
import FixedContainer from '../../../components/price/fixed/fixedContainer';
import DynamicContainer from '../../../components/price/dynamic/dynamicContainer';

export default function HandlePrice({navigation, route}) {
  const {
    fixedValue,
    cleanFields,
    quantityDynamic,
    setQuantityDynamic,
    createFixedPrice,
    createDynamicPrice,
    hasMaxValue,
    maxValue,
    updateFixedPrice,
    typePrice,
    isFixedEnabled,
    isDynamicEnabled,
    isEdit,
    setIsEdit,
    updateDynamicPrice,
    loadingPrice,
    setLoadingPrice,
  } = useContext(PriceContext);

  const [selectedWeekDays, setSelectedWeekDays] = useState('');

  useEffect(() => {
    if (route.params) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
    const save = async () => {
      if (!selectedWeekDays) {
        showWarning('Favor preencher pelo menos um dia da semana');
        return;
      }
      let created = false;
      console.log(typePrice);

      if (typePrice === 1) {
        if (!fixedValue) {
          showWarning('Favor preencher o campo valor');
          return;
        }
        if (!isEdit) {
          await createFixedPrice(selectedWeekDays).then((res) => {
            created = res;
            setLoadingPrice(false);
          });
        } else {
          await updateFixedPrice(selectedWeekDays).then((res) => {
            created = res;
            setLoadingPrice(false);
          });
        }
        if (!created) {
          return;
        }
        navigation.goBack();
        cleanFields();
      }
      if (typePrice === 2) {
        let isFieldsInvalid = false;
        if (hasMaxValue && maxValue === '') {
          showWarning('Favor preencher o campo valor máximo!');
          isFieldsInvalid = true;
        }
        quantityDynamic.map((item) => {
          if (!item.start || !item.end || !item.price) {
            showWarning('Favor preencher todos os campos!');
            isFieldsInvalid = true;
          }
        });
        if (isFieldsInvalid) {
          return;
        }
        if (!isEdit) {
          await createDynamicPrice(
            selectedWeekDays,
            hasMaxValue,
            maxValue,
          ).then((res) => {
            created = res;
            setLoadingPrice(false);
          });
        } else {
          await updateDynamicPrice(selectedWeekDays).then((res) => {
            created = res;
            setLoadingPrice(false);
          });
        }
        if (!created) {
          return;
        }
        navigation.goBack();
        cleanFields();
      }
    };
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      cleanFields();
      return true;
    });
    navigation.setOptions({
      title: 'Preço',
      headerRight: () => <SaveIcon onPress={() => save()} />,
      headerLeft: () => (
        <HeaderBackButton
          tintColor="#ffffff"
          onPress={() => {
            navigation.goBack();
            cleanFields();
          }}
        />
      ),
    });
    return () => BackHandler.removeEventListener('hardwareBackPress');
  }, [
    navigation,
    quantityDynamic,
    selectedWeekDays,
    typePrice,
    fixedValue,
    route.params,
    cleanFields,
    setQuantityDynamic,
    isEdit,
    createDynamicPrice,
    createFixedPrice,
    hasMaxValue,
    maxValue,
    updateFixedPrice,
    setIsEdit,
    updateDynamicPrice,
    setLoadingPrice,
  ]);

  const componentRender = () => {
    if (loadingPrice) {
      return (
        <ActivityIndicator
          style={styles.mainContainer}
          size="large"
          color="#0000ff"
        />
      );
    } else {
      return (
        <SafeAreaView style={styles.mainContainer}>
          <ScrollView
            contentContainerStyle={styles.containerScroll}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled">
            <DateButtonsCalendar
              OnWeekDayChange={(weekDays) => setSelectedWeekDays(weekDays)}
            />

            {isEdit && isFixedEnabled ? <FixedContainer /> : null}
            {isEdit && isDynamicEnabled ? <DynamicContainer /> : null}
            {!isEdit ? (
              <View>
                <FixedContainer />
                <Divider style={styles.divider} />
                <DynamicContainer />
              </View>
            ) : null}
          </ScrollView>
        </SafeAreaView>
      );
    }
  };

  return componentRender();
}

const styles = StyleSheet.create({
  containerScroll: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  containerTexts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#41484F',
    marginVertical: 10,
  },
});
