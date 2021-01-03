import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import {TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import {Text as TextEl} from 'react-native-elements';
import {PriceContext} from '../../contexts/price';
import {StoreContext} from '../../store/rootStore';

const DateButtonsCalendar = (props) => {
  const {priceStore} = useContext(StoreContext);
  // const {
  //   segunda,
  //   setSegunda,
  //   terca,
  //   setTerca,
  //   quarta,
  //   setQuarta,
  //   quinta,
  //   setQuinta,
  //   sexta,
  //   setSexta,
  //   sabado,
  //   setSabado,
  //   domingo,
  //   setDomingo,
  // } = useContext(PriceContext);

  useEffect(() => {
    const selectedWeekDays = () => {
      let string = `${priceStore.segunda ? 'MONDAY|' : ''}${
        priceStore.terca ? 'TUESDAY|' : ''
      }${priceStore.quarta ? 'WEDNESDAY|' : ''}${
        priceStore.quinta ? 'THURSDAY|' : ''
      }${priceStore.sexta ? 'FRIDAY|' : ''}${
        priceStore.sabado ? 'SATURDAY|' : ''
      }${priceStore.domingo ? 'SUNDAY|' : ''}`;

      const formatedString = deletePipeIfLast(string);
      props.OnWeekDayChange(formatedString);
    };

    const deletePipeIfLast = (text) => {
      if (text[text.length - 1] === '|') {
        const newString = text.slice(0, -1);
        return newString;
      }
      return text;
    };

    selectedWeekDays();
  }, [
    priceStore.segunda,
    priceStore.terca,
    priceStore.quarta,
    priceStore.quinta,
    priceStore.sexta,
    priceStore.sabado,
    priceStore.domingo,
    props,
  ]);

  return (
    <SafeAreaView style={styles.buttonsAreaContainer}>
      <TouchableOpacity
        style={
          priceStore.segunda
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => priceStore.setSegunda(!priceStore.segunda)}>
        <TextEl
          h4
          style={priceStore.segunda ? styles.textEnable : styles.textDisable}>
          S
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          priceStore.terca
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => priceStore.setTerca(!priceStore.terca)}>
        <TextEl
          h4
          style={priceStore.terca ? styles.textEnable : styles.textDisable}>
          T
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          priceStore.quarta
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => priceStore.setQuarta(!priceStore.quarta)}>
        <TextEl
          h4
          style={priceStore.quarta ? styles.textEnable : styles.textDisable}>
          Q
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          priceStore.quinta
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => priceStore.setQuinta(!priceStore.quinta)}>
        <TextEl
          h4
          style={priceStore.quinta ? styles.textEnable : styles.textDisable}>
          Q
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          priceStore.sexta
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => priceStore.setSexta(!priceStore.sexta)}>
        <TextEl
          h4
          style={priceStore.sexta ? styles.textEnable : styles.textDisable}>
          S
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          priceStore.sabado
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => priceStore.setSabado(!priceStore.sabado)}>
        <TextEl
          h4
          style={priceStore.sabado ? styles.textEnable : styles.textDisable}>
          S
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          priceStore.domingo
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => priceStore.setDomingo(!priceStore.domingo)}>
        <TextEl
          h4
          style={priceStore.domingo ? styles.textEnable : styles.textDisable}>
          D
        </TextEl>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonsAreaContainer: {
    margin: 14,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
  },
  buttonsContainerDisable: {
    width: '14%',
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainerEnable: {
    width: '15%',
    marginRight: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#12005e',
  },
  textEnable: {
    color: '#12005e',
  },
  textDisable: {
    color: '#41484F',
  },
});

export default observer(DateButtonsCalendar);
