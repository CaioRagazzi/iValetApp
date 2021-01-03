import React, {useContext} from 'react';
import {PriceContext} from '../../../contexts/price';
import InputTimer from './InputTimer';
import {showWarning} from '../../toast';
import {StoreContext} from '../../../store/rootStore';
import {observer} from 'mobx-react-lite';

const InputTimeDynamic = () => {
  const {priceStore} = useContext(StoreContext);
  // const {
  //   isDynamicEnabled,
  //   quantityDynamic,
  //   priceStore.setQuantityDynamic,
  //   deletePriceById,
  //   isEdit,
  // } = useContext(PriceContext);

  const getInputValue = (item) => {
    const resultItem = priceStore.quantityDynamic.find(
      (element) => element.id === item.id,
    );
    return resultItem;
  };

  const setStartInputValue = (item, value) => {
    const newArray = [...priceStore.quantityDynamic];
    newArray.forEach((element) => {
      if (element.id === item.id) {
        element.start = value;
      }
    });

    priceStore.setQuantityDynamic(newArray);
  };

  const setEndInputValue = (item, value) => {
    const newArray = [...priceStore.quantityDynamic];
    newArray.forEach((element) => {
      if (element.id === item.id) {
        element.end = value;
      }
    });

    priceStore.setQuantityDynamic(newArray);
  };

  const setPriceInputValue = (item, value) => {
    const newArray = [...priceStore.quantityDynamic];
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
