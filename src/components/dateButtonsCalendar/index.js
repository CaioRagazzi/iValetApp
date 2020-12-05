import React, {useContext, useEffect} from 'react';
import {TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import {Text as TextEl} from 'react-native-elements';
import {PriceContext} from '../../contexts/price';

export default function DateButtonsCalendar(props) {
  const {
    segunda,
    setSegunda,
    terca,
    setTerca,
    quarta,
    setQuarta,
    quinta,
    setQuinta,
    sexta,
    setSexta,
    sabado,
    setSabado,
    domingo,
    setDomingo,
  } = useContext(PriceContext);

  useEffect(() => {
    const selectedWeekDays = () => {
      let string = `${segunda ? 'MONDAY|' : ''}${terca ? 'TUESDAY|' : ''}${
        quarta ? 'WEDNESDAY|' : ''
      }${quinta ? 'THURSDAY|' : ''}${sexta ? 'FRIDAY|' : ''}${
        sabado ? 'SATURDAY|' : ''
      }${domingo ? 'SUNDAY|' : ''}`;

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
  }, [segunda, terca, quarta, quinta, sexta, sabado, domingo, props]);

  return (
    <SafeAreaView style={styles.buttonsAreaContainer}>
      <TouchableOpacity
        style={
          segunda
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => setSegunda(!segunda)}>
        <TextEl h4 style={segunda ? styles.textEnable : styles.textDisable}>
          S
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          terca ? styles.buttonsContainerEnable : styles.buttonsContainerDisable
        }
        onPress={() => setTerca(!terca)}>
        <TextEl h4 style={terca ? styles.textEnable : styles.textDisable}>
          T
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          quarta
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => setQuarta(!quarta)}>
        <TextEl h4 style={quarta ? styles.textEnable : styles.textDisable}>
          Q
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          quinta
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => setQuinta(!quinta)}>
        <TextEl h4 style={quinta ? styles.textEnable : styles.textDisable}>
          Q
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          sexta ? styles.buttonsContainerEnable : styles.buttonsContainerDisable
        }
        onPress={() => setSexta(!sexta)}>
        <TextEl h4 style={sexta ? styles.textEnable : styles.textDisable}>
          S
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          sabado
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => setSabado(!sabado)}>
        <TextEl h4 style={sabado ? styles.textEnable : styles.textDisable}>
          S
        </TextEl>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          domingo
            ? styles.buttonsContainerEnable
            : styles.buttonsContainerDisable
        }
        onPress={() => setDomingo(!domingo)}>
        <TextEl h4 style={domingo ? styles.textEnable : styles.textDisable}>
          D
        </TextEl>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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
