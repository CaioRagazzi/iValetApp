import React, {createContext, useState, useContext} from 'react';
import axios from '../services/axios';
import {format} from 'date-fns';
import {AuthContext} from '../contexts/auth';
import {showWarning, showError} from '../components/toast';

export const PriceContext = createContext();

export const PriceProvider = ({children}) => {
  const [loadingPrice, setLoadingPrice] = useState(false);
  const {companyId} = useContext(AuthContext);
  const [segunda, setSegunda] = useState(false);
  const [terca, setTerca] = useState(false);
  const [quarta, setQuarta] = useState(false);
  const [quinta, setQuinta] = useState(false);
  const [sexta, setSexta] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [domingo, setDomingo] = useState(false);
  const [fixedValue, setfixedValue] = useState('');
  const [isFixedEnabled, setIsFixedEnabled] = useState(true);
  const [isDynamicEnabled, setIsDynamicEnabled] = useState(false);
  const [quantityDynamic, setQuantityDynamic] = useState([]);
  const [hasMaxValue, setHasMaxValue] = useState(false);
  const [maxValue, setMaxValue] = useState('');
  const [typePrice, setTypePrice] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [price, setPrice] = useState();

  const getPriceByUniqueId = async (uniqueId) => {
    let priceReturn = [];
    await axios
      .get(`price/uniqueid/${uniqueId}`)
      .then((res) => {
        priceReturn = res.data;
      })
      .catch(() => {
        showError('Erro ao carregar os preços');
      });

    return priceReturn;
  };

  const handleSwitches = (type) => {
    if (type === 'fixed') {
      setTypePrice(1);
      if (!isFixedEnabled && isDynamicEnabled) {
        setIsDynamicEnabled(false);
      }
      setIsFixedEnabled((previousState) => !previousState);
    } else {
      setTypePrice(2);
      if (!isDynamicEnabled && isFixedEnabled) {
        setIsFixedEnabled(false);
      }
      if (quantityDynamic.length === 0) {
        setQuantityDynamic([
          {
            id: format(new Date(), 'HHmmssSSS'),
            start: '',
            end: '',
            price: '',
          },
        ]);
      }
      setIsDynamicEnabled((previousState) => !previousState);
    }
  };

  const populateFields = async (priceParam) => {
    setLoadingPrice(true);
    let priceReturnUnsorted;
    try {
      priceReturnUnsorted = await getPriceByUniqueId(priceParam.uniqueIdPrice);
    } catch (error) {
      showError('Erro ao carregar o preço!');
    }

    let priceReturn = priceReturnUnsorted.sort((a, b) => a.to > b.to);

    if (priceReturn[0].type === 1) {
      setWeekDaysButtons(priceReturn[0].weekDay);
      setfixedValue(priceReturn[0].price);
      setIsDynamicEnabled(false);
      setIsFixedEnabled(true);
    }

    if (priceReturn[0].type === 2) {
      setWeekDaysButtons(priceReturn[0].weekDay);
      setQuantityDynamic([]);
      setIsDynamicEnabled(true);
      setIsFixedEnabled(false);
      populateDynamicFields(priceReturn);
      if (priceReturn[0].maxPriceValue) {
        setHasMaxValue(true);
        setMaxValue(priceReturn[0].maxPriceValue);
      }
    }
    setLoadingPrice(false);
  };

  const populateDynamicFields = (priceParam) => {
    priceParam.map((priceItem) => {
      setQuantityDynamic((previousState) => [
        ...previousState,
        {
          id: priceItem.id,
          start: priceItem.to?.toString(),
          end: priceItem.from?.toString(),
          price: priceItem.price?.toString(),
          maxPriceValue: priceItem.maxPriceValue,
          type: priceItem.type,
          uniqueIdPrice: priceItem.uniqueIdPrice,
          weekDay: priceItem.weekDay,
        },
      ]);
    });
  };

  const setWeekDaysButtons = (weekdayParam) => {
    const splited = weekdayParam.split('|');

    splited.map((item) => {
      switch (item) {
        case 'MONDAY':
          setSegunda(true);
          break;
        case 'TUESDAY':
          setTerca(true);
          break;
        case 'WEDNESDAY':
          setQuarta(true);
          break;
        case 'THURSDAY':
          setQuinta(true);
          break;
        case 'FRIDAY':
          setSexta(true);
          break;
        case 'SATURDAY':
          setSabado(true);
          break;
        case 'SUNDAY':
          setDomingo(true);
          break;
      }
    });
  };

  const createFixedPrice = async (weekDays) => {
    let uniqueIdPrice = format(new Date(), 'HHmmssSSS');
    let created = false;
    setLoadingPrice(true);
    await axios
      .post('price', {
        type: 1,
        weekDay: weekDays,
        companyId,
        price: +fixedValue,
        uniqueIdPrice: uniqueIdPrice,
      })
      .then(() => {
        created = true;
      })
      .catch((err) => {
        if (err.response.data.message === 'Same day has already been added!') {
          showWarning('Já existe uma configuração para esse mesmo dia!');
        }
        showError('Erro ao criar o preço!');
        created = false;
        setLoadingPrice(false);
      });

    return created;
  };

  const updateFixedPrice = async (weekDay) => {
    let isRequestOk = false;
    setLoadingPrice(true);
    await axios
      .put(`price/${price.id}`, {
        weekDay,
        price: +fixedValue,
        uniqueIdPrice: price.uniqueIdPrice,
        companyId: price.companyId,
      })
      .then(() => {
        isRequestOk = true;
      })
      .catch((err) => {
        if (err.response.data.message === 'Same day has already been added!') {
          showWarning('Já existe uma configuração para esse mesmo dia!');
        }
        showError('Erro ao atualizar o preço!');
        isRequestOk = false;
        setLoadingPrice(false);
      });
    return isRequestOk;
  };

  const updateDynamicPrice = async (weekDay) => {
    let isRequestOk = false;
    setLoadingPrice(true);
    await Promise.all(
      quantityDynamic.map(async (item) => {
        await axios
          .put(`price/${item.id}`, {
            weekDay,
            price: +item.price,
            uniqueIdPrice: item.uniqueIdPrice,
            companyId,
            to: +item.start,
            from: +item.end,
            maxValue: hasMaxValue ? parseFloat(maxValue).toFixed(2) : null,
          })
          .then(() => {
            isRequestOk = true;
          })
          .catch((err) => {
            if (
              err.response.data.message === 'Same day has already been added!'
            ) {
              showWarning('Já existe uma configuração para esse mesmo dia!');
            }
            showError('Erro ao atualizar o preço!');
            isRequestOk = false;
            setLoadingPrice(false);
          });
      }),
    );
    return isRequestOk;
  };

  const createDynamicPrice = async (weekDays) => {
    let uniqueIdPrice = format(new Date(), 'HHmmssSSS');
    let created = false;
    setLoadingPrice(true);
    await Promise.all(
      quantityDynamic.map(async (item) => {
        await axios
          .post('price', {
            type: 2,
            to: +item.start,
            from: +item.end,
            weekDay: weekDays,
            companyId,
            price: +item.price,
            uniqueIdPrice: uniqueIdPrice,
            maxPriceValue: hasMaxValue ? +maxValue : undefined,
          })
          .then(() => {
            created = true;
          })
          .catch((err) => {
            if (
              err.response.data.message === 'Same day has already been added!'
            ) {
              showWarning('Já existe uma configuração para esse mesmo dia!');
            }
            showError('Erro ao criar o preço!');
            created = false;
            setLoadingPrice(false);
          });
      }),
    );

    return created;
  };

  const deletePriceById = async (priceId) => {
    let deleted = false;
    await axios
      .delete('price', {params: {priceId}})
      .then(() => {
        deleted = true;
      })
      .catch(() => {
        showError('Erro ao deletar o preço!');
        deleted = false;
      });
    return deleted;
  };

  const deletePriceByUniqueId = async (uniqueId) => {
    let deleted = false;
    await axios
      .delete('price/uniqueId', {params: {uniqueId}})
      .then(() => {
        deleted = true;
      })
      .catch(() => {
        showError('Erro ao deletar o preço!');
        deleted = false;
      });
    return deleted;
  };

  const cleanFields = () => {
    setTypePrice(1);
    setSegunda(false);
    setTerca(false);
    setQuarta(false);
    setQuinta(false);
    setSexta(false);
    setSabado(false);
    setDomingo(false);
    setIsFixedEnabled(true);
    setIsDynamicEnabled(false);
    setQuantityDynamic([]);
    setfixedValue('');
    setHasMaxValue(false);
    setMaxValue('');
  };

  return (
    <PriceContext.Provider
      value={{
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
        populateFields,
        fixedValue,
        setfixedValue,
        cleanFields,
        isFixedEnabled,
        setIsFixedEnabled,
        isDynamicEnabled,
        setIsDynamicEnabled,
        quantityDynamic,
        setQuantityDynamic,
        createFixedPrice,
        createDynamicPrice,
        hasMaxValue,
        setHasMaxValue,
        maxValue,
        setMaxValue,
        typePrice,
        setTypePrice,
        handleSwitches,
        isEdit,
        setIsEdit,
        setPrice,
        updateFixedPrice,
        updateDynamicPrice,
        deletePriceById,
        loadingPrice,
        setLoadingPrice,
        deletePriceByUniqueId,
      }}>
      {children}
    </PriceContext.Provider>
  );
};
