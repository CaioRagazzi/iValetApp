import React, {useContext} from 'react';
import InputTimer from './InputTimer';
import {StoreContext} from '../../../store/rootStore';
import {observer} from 'mobx-react-lite';

const InputTimeDynamic = () => {
  const {priceStore} = useContext(StoreContext);

  const getInputValue = (item) => {
    const resultItem = priceStore.quantityDynamic.find(
      (element) => element.id === item.id,
    );
    return resultItem;
  };

  const setStartInputValue = (item, value) => {
    console.log([...priceStore.quantityDynamic]);
    const newArray = JSON.parse(JSON.stringify(priceStore.quantityDynamic));
    newArray.forEach((element) => {
      if (element.id === item.id) {
        element.start = value;
      }
    });

    priceStore.setQuantityDynamic(newArray);
  };

  const setEndInputValue = (item, value) => {
    const newArray = JSON.parse(JSON.stringify(priceStore.quantityDynamic));
    newArray.forEach((element) => {
      if (element.id === item.id) {
        element.end = value;
      }
    });

    priceStore.setQuantityDynamic(newArray);
  };

  const setPriceInputValue = (item, value) => {
    const newArray = JSON.parse(JSON.stringify(priceStore.quantityDynamic));
    newArray.forEach((element) => {
      if (element.id === item.id) {
        element.price = value;
      }
    });

    priceStore.setQuantityDynamic(newArray);
  };

  return priceStore.isDynamicEnabled
    ? priceStore.quantityDynamic.map((item) => (
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
};

export default observer(InputTimeDynamic);
