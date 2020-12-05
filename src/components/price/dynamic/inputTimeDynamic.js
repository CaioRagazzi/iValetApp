import React, {useContext} from 'react';
import {PriceContext} from '../../../contexts/price';
import InputTimer from './InputTimer';
import {showWarning} from '../../toast';

export default function InputTimeDynamic() {
  const {
    isDynamicEnabled,
    quantityDynamic,
    setQuantityDynamic,
    deletePriceById,
    isEdit,
  } = useContext(PriceContext);

  const getInputValue = (item) => {
    const resultItem = quantityDynamic.find(
      (element) => element.id === item.id,
    );
    return resultItem;
  };

  const setStartInputValue = (item, value) => {
    const newArray = [...quantityDynamic];
    newArray.forEach((element) => {
      if (element.id === item.id) {
        element.start = value;
      }
    });

    setQuantityDynamic(newArray);
  };

  const setEndInputValue = (item, value) => {
    const newArray = [...quantityDynamic];
    newArray.forEach((element) => {
      if (element.id === item.id) {
        element.end = value;
      }
    });

    setQuantityDynamic(newArray);
  };

  const setPriceInputValue = (item, value) => {
    const newArray = [...quantityDynamic];
    newArray.forEach((element) => {
      if (element.id === item.id) {
        element.price = value;
      }
    });

    setQuantityDynamic(newArray);
  };

  return isDynamicEnabled
    ? quantityDynamic.map((item) => (
        <InputTimer
          startValue={getInputValue(item)?.start}
          onStartChangeText={(value) => setStartInputValue(item, value)}
          endValue={getInputValue(item)?.end}
          onEndChangeText={(value) => setEndInputValue(item, value)}
          priceValue={getInputValue(item)?.price}
          onPriceChangeText={(value) => setPriceInputValue(item, value)}
          key={item.id}
          onRemove={item.id}
        />
      ))
    : null;
}
