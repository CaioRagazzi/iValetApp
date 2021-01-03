import axios from '../services/axios';
import {showError, showWarning} from '../components/toast';
import {runInAction, makeAutoObservable} from 'mobx';
import {format} from 'date-fns';

export default class PriceStore {
  loadingPrice = false;
  segunda = false;
  terca = false;
  quarta = false;
  quinta = false;
  sexta = false;
  sabado = false;
  domingo = false;
  fixedValue = '';
  isFixedEnabled = true;
  isDynamicEnabled = false;
  quantityDynamic = [];
  hasMaxValue = false;
  maxValue = '';
  typePrice = 1;
  isEdit = false;
  price = null;

  constructor(rootStore) {
    makeAutoObservable(this);
    this.authStore = rootStore.authStore;
  }

  setMaxValue(value) {
    runInAction(() => {
      this.maxValue = value;
    });
  }

  setSegunda(value) {
    runInAction(() => {
      this.segunda = value;
    });
  }

  setTerca(value) {
    runInAction(() => {
      this.terca = value;
    });
  }

  setQuarta(value) {
    runInAction(() => {
      this.quarta = value;
    });
  }

  setQuinta(value) {
    runInAction(() => {
      this.quinta = value;
    });
  }

  setSexta(value) {
    runInAction(() => {
      this.sexta = value;
    });
  }

  setSabado(value) {
    runInAction(() => {
      this.sabado = value;
    });
  }

  setDomingo(value) {
    runInAction(() => {
      this.domingo = value;
    });
  }

  setFixedValue(value) {
    runInAction(() => {
      this.fixedValue = value;
    });
  }

  setQuantityDynamic(value) {
    runInAction(() => {
      this.quantityDynamic = value;
    });
  }

  setHasMaxValue(value) {
    runInAction(() => {
      this.hasMaxValue = value;
    });
  }

  setIsEdit(value) {
    runInAction(() => {
      this.isEdit = value;
    });
  }

  setLoadingPrice(value) {
    runInAction(() => {
      this.loadingPrice = value;
    });
  }

  setPrice(value) {
    runInAction(() => {
      this.price = value;
    });
  }

  setTypePrice(value) {
    runInAction(() => {
      this.typePrice = value;
    });
  }

  async getPriceByUniqueId(uniqueId) {
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
  }

  handleSwitches(type) {
    if (type === 'fixed') {
      runInAction(() => (this.price = 1));
      if (!this.isFixedEnabled && this.isDynamicEnabled) {
        runInAction(() => {
          this.isDynamicEnabled = false;
        });
      }
      runInAction(() => {
        this.isFixedEnabled = !this.isFixedEnabled;
      });
    } else {
      runInAction(() => (this.price = 2));
      if (!this.isDynamicEnabled && this.isFixedEnabled) {
        runInAction(() => {
          this.isFixedEnabled = false;
        });
      }
      if (this.quantityDynamic.length === 0) {
        runInAction(() => {
          this.quantityDynamic = [
            {
              id: format(new Date(), 'HHmmssSSS'),
              start: '',
              end: '',
              price: '',
            },
          ];
        });
      }
      runInAction(() => {
        this.isDynamicEnabled = !this.isDynamicEnabled;
      });
    }
  }

  async populateFields(priceParam) {
    runInAction(() => {
      this.loadingPrice = true;
    });
    let priceReturnUnsorted;
    try {
      priceReturnUnsorted = await this.getPriceByUniqueId(
        priceParam.uniqueIdPrice,
      );
    } catch (error) {
      showError('Erro ao carregar o preço!');
    }

    let priceReturn = priceReturnUnsorted.sort((a, b) => a.to > b.to);

    if (priceReturn[0].type === 1) {
      this.setWeekDaysButtons(priceReturn[0].weekDay);
      runInAction(() => {
        this.fixedValue = priceReturn[0].price;
      });
      runInAction(() => {
        this.isDynamicEnabled = false;
      });
      runInAction(() => {
        this.isFixedEnabled = true;
      });
    }

    if (priceReturn[0].type === 2) {
      this.setWeekDaysButtons(priceReturn[0].weekDay);
      runInAction(() => {
        this.quantityDynamic = [];
      });
      runInAction(() => {
        this.isDynamicEnabled = true;
      });
      runInAction(() => {
        this.isFixedEnabled = false;
      });
      this.populateDynamicFields(priceReturn);
      if (priceReturn[0].maxPriceValue) {
        runInAction(() => {
          this.hasMaxValue = true;
        });
        runInAction(() => {
          this.maxValue = priceReturn[0].maxPriceValue;
        });
      }
    }
    runInAction(() => {
      this.loadingPrice = false;
    });
  }

  populateDynamicFields(priceParam) {
    priceParam.map((priceItem) => {
      runInAction(() => {
        this.quantityDynamic = [
          ...this.quantityDynamic,
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
        ];
      });
    });
  }

  setWeekDaysButtons(weekdayParam) {
    const splited = weekdayParam.split('|');

    splited.map((item) => {
      switch (item) {
        case 'MONDAY':
          runInAction(() => {
            this.segunda = true;
          });
          break;
        case 'TUESDAY':
          runInAction(() => {
            this.terca = true;
          });
          break;
        case 'WEDNESDAY':
          runInAction(() => {
            this.quarta = true;
          });
          break;
        case 'THURSDAY':
          runInAction(() => {
            this.quinta = true;
          });
          break;
        case 'FRIDAY':
          runInAction(() => {
            this.sexta = true;
          });
          break;
        case 'SATURDAY':
          runInAction(() => {
            this.sabado = true;
          });
          break;
        case 'SUNDAY':
          runInAction(() => {
            this.domingo = true;
          });
          break;
      }
    });
  }

  async createFixedPrice(weekDays) {
    let uniqueIdPrice = format(new Date(), 'HHmmssSSS');
    let created = false;
    runInAction(() => {
      this.loadingPrice = true;
    });
    await axios
      .post('price', {
        type: 1,
        weekDay: weekDays,
        companyId: this.authStore.companyId,
        price: +this.fixedValue,
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
        runInAction(() => {
          this.loadingPrice = false;
        });
      });

    return created;
  }

  async updateFixedPrice(weekDay) {
    let isRequestOk = false;
    runInAction(() => {
      this.loadingPrice = true;
    });
    await axios
      .put(`price/${this.price.id}`, {
        weekDay,
        price: +this.fixedValue,
        uniqueIdPrice: this.price.uniqueIdPrice,
        companyId: this.price.companyId,
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
        runInAction(() => {
          this.loadingPrice = false;
        });
      });
    return isRequestOk;
  }

  async updateDynamicPrice(weekDay) {
    let isRequestOk = false;
    runInAction(() => {
      this.loadingPrice = true;
    });
    await Promise.all(
      this.quantityDynamic.map(async (item) => {
        await axios
          .put(`price/${item.id}`, {
            weekDay,
            price: +item.price,
            uniqueIdPrice: item.uniqueIdPrice,
            companyId: this.authStore.companyId,
            to: +item.start,
            from: +item.end,
            maxValue: this.hasMaxValue
              ? parseFloat(this.maxValue).toFixed(2)
              : null,
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
            runInAction(() => {
              this.loadingPrice = false;
            });
          });
      }),
    );
    return isRequestOk;
  }

  async createDynamicPrice(weekDays) {
    let uniqueIdPrice = format(new Date(), 'HHmmssSSS');
    let created = false;
    runInAction(() => {
      this.loadingPrice = true;
    });
    await Promise.all(
      this.quantityDynamic.map(async (item) => {
        await axios
          .post('price', {
            type: 2,
            to: +item.start,
            from: +item.end,
            weekDay: weekDays,
            companyId: this.authStore.companyId,
            price: +item.price,
            uniqueIdPrice: uniqueIdPrice,
            maxPriceValue: this.hasMaxValue ? +this.maxValue : undefined,
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
            runInAction(() => {
              this.loadingPrice = false;
            });
          });
      }),
    );

    return created;
  }

  async deletePriceById(priceId) {
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
  }

  async deletePriceByUniqueId(uniqueId) {
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
  }

  cleanFields() {
    runInAction(() => (this.price = 1));
    runInAction(() => {
      this.segunda = false;
    });
    runInAction(() => {
      this.terca = false;
    });
    runInAction(() => {
      this.quarta = false;
    });
    runInAction(() => {
      this.quinta = false;
    });
    runInAction(() => {
      this.sexta = false;
    });
    runInAction(() => {
      this.sabado = false;
    });
    runInAction(() => {
      this.domingo = false;
    });
    runInAction(() => {
      this.isFixedEnabled = true;
    });
    runInAction(() => {
      this.isDynamicEnabled = false;
    });
    runInAction(() => {
      this.quantityDynamic = [];
    });
    runInAction(() => {
      this.fixedValue = '';
    });
    runInAction(() => {
      this.hasMaxValue = false;
    });
    runInAction(() => {
      this.maxValue = '';
    });
  }
}
