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
import {StoreContext} from '../../../store/rootStore';
import { observer } from 'mobx-react-lite';

const HandlePrice = ({navigation, route}) => {
  const {priceStore} = useContext(StoreContext);
  // const {
  //   fixedValue,
  //   cleanFields,
  //   quantityDynamic,
  //   setQuantityDynamic,
  //   createFixedPrice,
  //   createDynamicPrice,
  //   hasMaxValue,
  //   maxValue,
  //   updateFixedPrice,
  //   typePrice,
  //   isFixedEnabled,
  //   isDynamicEnabled,
  //   isEdit,
  //   setIsEdit,
  //   updateDynamicPrice,
  //   loadingPrice,
  //   setLoadingPrice,
  // } = useContext(PriceContext);

  const [selectedWeekDays, setSelectedWeekDays] = useState('');

  useEffect(() => {
    if (route.params) {
      priceStore.setIsEdit(true);
    } else {
      priceStore.setIsEdit(false);
    }
    const save = async () => {
      if (!selectedWeekDays) {
        showWarning('Favor preencher pelo menos um dia da semana');
        return;
      }
      let created = false;
      console.log(priceStore.typePrice);

      if (priceStore.typePrice === 1) {
        if (!priceStore.fixedValue) {
          showWarning('Favor preencher o campo valor');
          return;
        }
        if (!priceStore.isEdit) {
          await priceStore.createFixedPrice(selectedWeekDays).then((res) => {
            created = res;
            priceStore.setLoadingPrice(false);
          });
        } else {
          await priceStore.updateFixedPrice(selectedWeekDays).then((res) => {
            created = res;
            priceStore.setLoadingPrice(false);
          });
        }
        if (!created) {
          return;
        }
        navigation.goBack();
        priceStore.cleanFields();
      }
      if (priceStore.typePrice === 2) {
        let isFieldsInvalid = false;
        if (priceStore.hasMaxValue && priceStore.maxValue === '') {
          showWarning('Favor preencher o campo valor máximo!');
          isFieldsInvalid = true;
        }
        priceStore.quantityDynamic.map((item) => {
          if (!item.start || !item.end || !item.price) {
            showWarning('Favor preencher todos os campos!');
            isFieldsInvalid = true;
          }
        });
        if (isFieldsInvalid) {
          return;
        }
        if (!priceStore.isEdit) {
          await priceStore
            .createDynamicPrice(
              priceStore.selectedWeekDays,
              priceStore.hasMaxValue,
              priceStore.maxValue,
            )
            .then((res) => {
              created = res;
              priceStore.setLoadingPrice(false);
            });
        } else {
          await priceStore.updateDynamicPrice(selectedWeekDays).then((res) => {
            created = res;
            priceStore.setLoadingPrice(false);
          });
        }
        if (!created) {
          return;
        }
        navigation.goBack();
        priceStore.cleanFields();
      }
    };
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      priceStore.cleanFields();
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
            priceStore.cleanFields();
          }}
        />
      ),
    });
    return () => BackHandler.removeEventListener('hardwareBackPress');
  }, [navigation, selectedWeekDays, route.params, priceStore]);

  const componentRender = () => {
    if (priceStore.loadingPrice) {
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

            {priceStore.isEdit && priceStore.isFixedEnabled ? (
              <FixedContainer />
            ) : null}
            {priceStore.isEdit && priceStore.isDynamicEnabled ? (
              <DynamicContainer />
            ) : null}
            {!priceStore.isEdit ? (
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
};

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

export default observer(HandlePrice);
