import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input} from 'react-native-elements';
import {PriceContext} from '../../../contexts/price';
import {showWarning} from '../../toast';
import Orientation from 'react-native-orientation';
import {StoreContext} from '../../../store/rootStore';
import {observer} from 'mobx-react-lite';

const InputTimer = (props) => {
  const {priceStore} = useContext(StoreContext);
  // const {
  //   quantityDynamic,
  //   setQuantityDynamic,
  //   deletePriceById,
  //   isEdit,
  // } = useContext(PriceContext);
  const [loadingDeleteButton, setLoadingDeleteButton] = useState(false);
  const [orientation, setOrientation] = useState(
    Orientation.getInitialOrientation(),
  );

  useEffect(() => {
    Orientation.addOrientationListener(setOrientation);

    Orientation.getOrientation((_, ori) => {
      setOrientation(ori);
    });

    return () => {
      Orientation.removeOrientationListener(setOrientation);
    };
  }, []);

  const onRemove = async () => {
    setLoadingDeleteButton(true);
    if (priceStore.quantityDynamic.length <= 1) {
      showWarning('É necessário ter pelo menos um campo');
      setLoadingDeleteButton(false);
      return;
    } else {
      if (priceStore.isEdit) {
        await priceStore.deletePriceById(props.onRemove).then((res) => {
          removeIndexFromArray();
        });
      } else {
        removeIndexFromArray();
      }
    }
  };

  const removeIndexFromArray = () => {
    const newArray = priceStore.quantityDynamic.filter((item) => {
      return props.onRemove !== item.id;
    });
    priceStore.setQuantityDynamic(newArray);
  };

  const deleteButton = () => {
    if (loadingDeleteButton) {
      return <ActivityIndicator size="small" color="#0000ff" />;
    } else {
      return (
        <TouchableOpacity
          onPress={() => onRemove()}
          style={styles.removeButton}>
          <Icon name="remove-circle-outline" size={22} color="#9E8170" />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.inputMainContainerDynamic}>
      <View style={styles.subMainContainer}>
        <Input
          label="Início minutos:"
          inputContainerStyle={styles.inputContainerDynamic}
          leftIconContainerStyle={styles.inputIconContainerDynamic}
          leftIcon={<Icon name="time-outline" size={18} color="black" />}
          keyboardType="numeric"
          value={props.startValue}
          onChangeText={(text) => props.onStartChangeText(text)}
        />
      </View>
      <View style={styles.subMainContainer}>
        <Input
          label="Final minutos:"
          inputContainerStyle={styles.inputContainerDynamic}
          leftIconContainerStyle={styles.inputIconContainerDynamic}
          leftIcon={<Icon name="time-outline" size={18} color="black" />}
          keyboardType="numeric"
          value={props.endValue}
          onChangeText={(text) => props.onEndChangeText(text)}
        />
      </View>
      <View style={styles.subMainContainer}>
        <Input
          labelStyle={
            orientation === 'PORTRAIT' ? {marginBottom: 18} : {marginBottom: 0}
          }
          label="Preço"
          inputContainerStyle={styles.inputContainerDynamic}
          leftIconContainerStyle={styles.inputIconContainerDynamic}
          leftIcon={<Icon name="cash-outline" size={18} color="black" />}
          keyboardType="numeric"
          value={props.priceValue}
          onChangeText={(text) => props.onPriceChangeText(text)}
        />
      </View>
      {deleteButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  inputMainContainerDynamic: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    paddingLeft: 10,
  },
  inputContainerDynamic: {
    borderWidth: 1,
    borderRadius: 5,
  },
  inputIconContainerDynamic: {
    paddingLeft: 10,
  },
  subMainContainer: {
    width: '30%',
  },
  removeButton: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default observer(InputTimer);
